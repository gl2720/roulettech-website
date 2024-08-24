from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import index, hello_world, ListItemViewSet
from django.urls import re_path

router = DefaultRouter()
router.register(r'list-items', ListItemViewSet)

urlpatterns = [
    path('hello/', hello_world),
    path('api/', include(router.urls)),
    re_path(r'^.*$', index, name='index'),  # Serve React app for all other routes
]