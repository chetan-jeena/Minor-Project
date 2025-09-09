from django.urls import path
from . import views

urlpatterns = [

  path('client/register/', views.register, name='register'),
  path('owner/register/', views.owner_register, name='owner_register'),
]