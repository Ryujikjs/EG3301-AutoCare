from django.db import models
from enum import Enum
   


class Mode(models.Model):
    
    # Define choices for the machine's states
    STANDBY = 'STANDBY'
    MOVING = 'MOVING'
    DROPOFF = 'DROPOFF'
    PICKUP = 'PICKUP'
    ERROR = 'ERROR'
    CHARGING = 'CHARGING'

    STATE_CHOICES = [
        (STANDBY, 'Standby'),
        (MOVING, 'Moving'),
        (DROPOFF, 'Dropoff'),
        (PICKUP, 'Pickup'),
        (ERROR, 'Error'),
        (CHARGING, 'Charging'),
    ]

    # Field to store the current state
    mode = models.CharField(max_length=20, choices=STATE_CHOICES, default=STANDBY)

    def __str__(self):
        return self.mode
    

class Staff(models.Model):
    firstname = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

