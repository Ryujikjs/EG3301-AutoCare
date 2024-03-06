from django.http import JsonResponse
from .models import Mode
from .models import Staff
from .serializers import StateSerializer
from .serializers import StaffSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
from django.http import HttpResponse

from django.shortcuts import render
from django.views import View
import json


def view_mode(requeset):
    mode = Mode.objects.all()
    serializer = StateSerializer(mode, many=True)
    return JsonResponse(serializer.data, safe=False)

def nextjs_app(request):
    return render(request, 'nextjs_app.html')


@api_view(['POST'])
def update_mode(request,pk):
    try:
        mode = Mode.objects.get(pk=pk)
    except Mode.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'POST':
        serializer = StateSerializer(mode, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        if(request.data == '1'):
            mode.mode = '1'
            mode.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Index(View):

    def get(self, request):
        return render(request, 'index.html')

        
def get_machine_state(request):
    try:
        # Retrieve the machine state from the database or any other source
        machine_state = Mode.objects.get(id=1)
        serializer = StateSerializer(machine_state, many=True)
        return JsonResponse({'state': serializer.data})
    except Mode.DoesNotExist:
        return JsonResponse({'error': 'Machine state not found'}, status=404)
    

@api_view(['POST'])
def login(request):
    staff_objects = Staff.objects.all()
    json_dict = json.loads(request.body)

    matching_staff = None

    for staff in staff_objects:
        if staff.firstname == json_dict['firstname'] and staff.password == json_dict['password']:
            matching_staff = staff
            break

    if matching_staff is not None:
        # If you found a matching staff member, you might want to return some information about them
        serializer = StaffSerializer(matching_staff)  # Assuming you have a serializer for your Staff model
        return JsonResponse(serializer.data)
    else:
        # If no matching staff member was found, you might want to return an appropriate response
        return JsonResponse({'message': 'Invalid credentials'}, status=401)


     
