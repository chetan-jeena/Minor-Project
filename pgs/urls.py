from django.urls import path
from . import views

urlpatterns = [
  path('<slug:pg_slug>/', views.pg_detail, name='pg_detail'),
]
