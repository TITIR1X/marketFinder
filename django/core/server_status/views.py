from django.http import HttpResponse
from django.shortcuts import render

def responseView(request):
    return HttpResponse("Respuesta exitosa", status=200)