from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import hello_world, ListItemViewSet

router = DefaultRouter()
router.register(r'list-items', ListItemViewSet)

urlpatterns = [
    path('hello/', hello_world),
    path('api/', include(router.urls))
]