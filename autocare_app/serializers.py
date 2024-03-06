from rest_framework import serializers
from .models import Mode
from .models import Staff

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mode
        fields = ['id','mode']


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['id' , 'firstname' , 'password']