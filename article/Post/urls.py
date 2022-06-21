from django.urls import URLPattern, path
from django.urls import re_path as url
from Post.views import *
from django.urls import re_path

urlpatterns = [
    path('allpost/',AllPost.as_view()),
    path('current/',Current.as_view()),
    re_path(r".*", front) 
]