#!/usr/bin/env python

import sys

try:
    import RPi.GPIO as GPIO
except RuntimeError:
    print("Error importing RPi.GPIO!")


ON = GPIO.HIGH
OFF = GPIO.LOW

#intputs
iIND_L = 8
iIND_R = 12
iHI_BEAM = 16
iLO_BEAM = 22
iPOS_LIGHTS = 24
iINSTR_TAIL = 32
iHORN = 36
iENGINE = 38
iWINKERS = [iIND_L,iIND_R]


#outputs
oIND_L = 7
oIND_R = 11
oHI_BEAM = 15
oLO_BEAM = 21
oPOS_LIGHTS = 23
oINSTR_TAIL = 31
oHORN = 35
oENGINE = 37
oWINKERS = [oIND_L,oIND_R]

#list of inputs
ch_input = [7,11,15,21,23,31,35,37]
ch_output = [8,12,16,22,24,32,36,38]


def setup_channels():
   
    GPIO.setup(ch_output,GPIO.OUT)
    GPIO.setup(ch_input,GPIO.IN)
                  
               
def toggle_output(ch,state):
    GPIO.output(ch,state)

    

def toggle_winker_pwm(side, state):

    p = GPIO.PWM(side,1)

    if state is ON:
        p.start(50)
    elif state is OFF:
        p.stop()
    else:
        sys.exit("invalid state")

        
#run starter for a fixed period
def engine_start():
    toggle_output(ENGINE,ON)
    time.sleep(5)
    toggle_output(ENGINE,OFF)
    
               
def winker_release():

    GPIO.output(WINKERS,OFF)


def all_off():
        GPIO.output(ch_output,OFF)
        
def forward_inputs():
    for ch in ch_input:
        state = GPIO.input(ch)

        #debuf
        print("channel " + str(ch) + "read")
        print("setting channel: " + str(ch + 1)+ " to state: " + str(state))

        GPIO.output(ch+1,state)

        
def parse_command():

    if (len(sys.argv)) < 2:
        sys.exit("too few argument")

    command = sys.argv[1]
      
    options = {'1' : forward_inputs,
               '2' : toggle_output,
               '3' : engine_start,
               '4' : toggle_winker_pwm,
               '5' : winker_release,
               '6' : all_off,
    }

    options[command]()
   
    return



def main():

    GPIO.setmode(GPIO.BOARD)
    print("mode is: " + str(GPIO.getmode()))

    setup_channels()
    forward_inputs()
      
    parse_command()

    return


# ==================================================
if __name__ == "__main__": main()
