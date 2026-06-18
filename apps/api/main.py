import asyncio
from contextlib import asynccontextmanager
from typing import Literal

from fastapi import FastAPI, Query, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from apps.api.catalog import (
    BANNERS,
    CATEGORIES,
    FILTERS,
    get_restaurant_sections,
)
from apps.api.websocket import delivery_websocket, listen_for_results


@asynccontextmanager
async def lifespan(app: FastAPI):
    listener_task = asyncio.create_task(listen_for_results())
    yield
    listener_task.cancel()
    try:
        await listener_task
    except asyncio.CancelledError:
        pass


app = FastAPI(title="Food Delivery API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Category(BaseModel):
    id: str
    name: str
    icon: str


class Restaurant(BaseModel):
    id: str
    name: str
    imageUrl: str
    rating: float
    reviewCount: str
    preparationTimeMin: int
    promotion: str | None = None
    categoryIds: list[str]
    lat: float
    lng: float


class RestaurantSection(BaseModel):
    id: str
    title: str
    restaurants: list[Restaurant]


class Banner(BaseModel):
    id: str
    variant: Literal["pink", "teal"]
    title: str
    subtitle: str | None = None
    code: str | None = None
    ctaLabel: str
    imageUrl: str
    badge: str | None = None


class Filter(BaseModel):
    id: str
    label: str
    icon: Literal["tag", "star", "crown"] | None = None
    hasDropdown: bool | None = None


class HealthResponse(BaseModel):
    status: str


@app.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="ok")


@app.get("/api/categories", response_model=list[Category])
def list_categories() -> list[Category]:
    return [Category(**category) for category in CATEGORIES]


@app.get("/api/restaurant-sections", response_model=list[RestaurantSection])
def list_restaurant_sections(
    categoryId: str | None = Query(default=None),
) -> list[RestaurantSection]:
    sections = get_restaurant_sections(categoryId)
    return [RestaurantSection(**section) for section in sections]


@app.get("/api/banners", response_model=list[Banner])
def list_banners() -> list[Banner]:
    return [Banner(**banner) for banner in BANNERS]


@app.get("/api/filters", response_model=list[Filter])
def list_filters() -> list[Filter]:
    return [Filter(**filter_item) for filter_item in FILTERS]


@app.websocket("/ws/delivery")
async def ws_delivery(websocket: WebSocket) -> None:
    await delivery_websocket(websocket)
