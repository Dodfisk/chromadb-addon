from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import chromadb
from chromadb.config import Settings

app = FastAPI(title="ChromaDB API")

# Initialize ChromaDB client
client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory="/data/chromadb"
))

class AddRequest(BaseModel):
    documents: List[str]
    embeddings: List[List[float]]
    metadatas: List[Dict[str, Any]]
    ids: List[str]

class QueryRequest(BaseModel):
    query_embeddings: List[List[float]]
    n_results: int = 10

@app.post("/api/v1/collections/{collection_name}")
async def create_collection(collection_name: str):
    try:
        collection = client.create_collection(name=collection_name)
        return {"message": f"Collection {collection_name} created successfully"}
    except ValueError as e:
        if "Collection already exists" in str(e):
            raise HTTPException(status_code=400, detail=f"Collection {collection_name} already exists")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/v1/collections/{collection_name}/add")
async def add_documents(collection_name: str, request: AddRequest):
    try:
        collection = client.get_or_create_collection(name=collection_name)
        collection.add(
            documents=request.documents,
            embeddings=request.embeddings,
            metadatas=request.metadatas,
            ids=request.ids
        )
        return {"message": f"Added {len(request.documents)} documents to collection {collection_name}"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/v1/collections/{collection_name}/query")
async def query_collection(collection_name: str, request: QueryRequest):
    try:
        collection = client.get_collection(name=collection_name)
        results = collection.query(
            query_embeddings=request.query_embeddings,
            n_results=request.n_results
        )
        return {"results": results}
    except ValueError as e:
        if "Collection not found" in str(e):
            raise HTTPException(status_code=404, detail=f"Collection {collection_name} not found")
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/v1/collections")
async def list_collections():
    collections = client.list_collections()
    return {"collections": [col.name for col in collections]}

@app.get("/api/v1/collections/{collection_name}")
async def get_collection(collection_name: str):
    try:
        collection = client.get_collection(name=collection_name)
        return {
            "name": collection_name,
            "metadata": collection.metadata
        }
    except ValueError as e:
        if "Collection not found" in str(e):
            raise HTTPException(status_code=404, detail=f"Collection {collection_name} not found")
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/api/v1/collections/{collection_name}")
async def delete_collection(collection_name: str):
    try:
        client.delete_collection(name=collection_name)
        return {"message": f"Collection {collection_name} deleted successfully"}
    except ValueError as e:
        if "Collection not found" in str(e):
            raise HTTPException(status_code=404, detail=f"Collection {collection_name} not found")
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
