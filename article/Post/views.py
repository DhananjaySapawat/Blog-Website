from re import I
from urllib import response
from django.shortcuts import render,redirect
from .models import Post
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
# Create your views here.
def check(id,currentid):
    post=Post.objects.get(pk=id)
    if (post.likes.filter(id=currentid).exists()) :
        return True
    else:
        return False
class AllPost(APIView):
    all_post = Post.objects.all()
    def get(self, request):
        detail = [ {"id" :detail.id,"article_title": detail.article_title,"description": detail.description,"username": detail.username,"article_image": detail.article_image,"company":detail.company,"isliked":check(detail.id,request.user.id),"likes":detail.number_of_likes(),"date":detail.date} 
        for detail in Post.objects.all().order_by('-id')]
        return Response(detail)
  
    def post(self, request):
        if(request.data["data"]["type"] == "add"):
            article_title = request.data["data"]["article_title"]
            description = request.data["data"]["description"]
            username =  request.user
            article_image = request.data["data"]["article_image"]
            company = 'dhanu Programming'
            posts = Post(article_title=article_title,description=description,username = username,article_image=article_image,company=company)
            posts.save()
        elif(request.data["data"]["type"] == "delete"):
            post_to_delete=Post.objects.get(pk=request.data["data"]["id"])
            if(post_to_delete.username == str(request.user)):
                post_to_delete.delete()
        elif(request.data["data"]["type"] == "edit"):
            post_to_edit=Post.objects.get(pk=request.data["data"]["id"])
            post_to_edit.article_title = request.data["data"]["article_title"]
            post_to_edit.description = request.data["data"]["description"]
            post_to_edit.article_image = request.data["data"]["article_image"]
            post_to_edit.save() 
        elif(request.data["data"]["type"] == "like"):
            post_to_edit=Post.objects.get(pk=request.data["data"]["id"])
            currentid = request.user.id
            if post_to_edit.likes.filter(id=currentid).exists():
                post_to_edit.likes.remove(currentid)
            else:
                post_to_edit.likes.add(currentid)
        return Response( status=status.HTTP_200_OK)

def front(request):
    current_user = request.user
    context = {'current_user':current_user}
    if(request == 'POST'):
        print(request.POST['createTitle'])
    return render(request, "index.html", context)
class Current(APIView):
    def get(self, request):
        current_user = str(request.user)
        current_id = str(request.user.id)
        return JsonResponse({'current_user'  : current_user,'current_id' : current_id}, safe=False)