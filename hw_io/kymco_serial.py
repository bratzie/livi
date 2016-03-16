#!/usr/bin/env python
import time
import sys
import serial

#usb relay as acm device
DEVICE = '/dev/ttyACMO' 


class MCIoSer:


    ON = 1
    OFF = 0
    
    TIMEOUT_SEC = 0.1
    ALL_SIG = '\x19'
    ALLON = '\x64'
    ALLOFF = '\x6E'

    input_Signals ={'IND_L' : '\x0',
                    'IND_R' : '\x1',
                    'HORN' : '\x2',
                    'MAIN' : '\x3',
                    'POS_L' :'\x4',
                    'ENG' :  '\x5',
                    'HI_B' : '\x6',
                    'LO_B' : '\x7',
                    
    }

    output_Signals ={'IND_L' : '\x65',
                     'IND_R' : '\x66',
                     'HORN' : '\x67',
                     'MAIN' : '\x68',
                     'POS_L' : '\x69',
                     'ENG' :  '\x6A',
                     'HI_B' : '\x6B',
                     'LO_B' : '\x6C',
                    
    }


    
    def __init__(self):
        self.is_Main_Light = 0
        self.usb_Opto_Rly = None
        
    def __call__(self):
        return self
# ***************************
# SETUP
#***************************
    def setup_Serial(self,device):
        try:
            usb_Opto_Rly = serial.Serial(device, 9600, serial.EIGHTBITS, serial.PARITY_NONE, serial.STOPBITS_ONE, MC_Io_Serial.TIMEOUT_SEC)

        except serial.SerialException:
            print('Unable to connect to  device ' + DEVICE)
            print('Make sure the usb_opto_relay board is powered and USB cable is plugged in!')
            sys.exit(1)


# **********************************
# board specific get / set wrappers
#***********************************
        
    def set_Output_Single(self, channel, state):
        if state is ON:
            self.usb_Opto_Rly.write(channel)
        elif state is OFF:
            self.usb_Opto_Rly.write(channel + 0x0A)
        else:
            print('Unsupported state')
            sys.exit(1)
            
    def set_Output_Group(self,state):
        if state is ON:
            self.usb_Opto_Rly.write(ALLON)
        else:
            self.usb_Opto_Rly.write(ALLOFF) 

            
    def get_Input_single(self, signal):
        self.usb_Opto_Rly.write(ALL_SIG)
       
        status_Byte = self.usb_Opto_Rly.read()
        return (status_Byte >> signal) & 1
    
    def get_Input_Group():
        self.usb_Opto_Rly.write(ALL_SIG)

        signal_states = dict()
        
        status_Byte = self.usb_Opto_Rly.read()
        for i in input_signals:
            signal_states.update({i: (status_Byte & (1 << i))})
                
        return signal_states

        
# ***************************
# API functions
# ***************************

    def toggle_HI_Beam(self, state):
        set_Output_Single(output_Signals['HI_B'],state)

    def toggle_LO_Beam(self, state):
        set_Output_Single(output_Signals['LO_B'],state)

    def toggel_Indicator(self, side, state):
        if side is LEFT:
            set_Output_Single(output_Signals['IND_L'],state)
        elif side is RIGHT:
            set_Output_Single(output_Signals['IND_R'],state)
        else:
            sys.exit("invalid parameter value: side " + str(side))

    def toggle_Position_Light(self,state):
        set_Output_Single(output_Signals['POS_L'],state)

    def toggle_lights(self, state):
        if state is ON:
            self.isMain = True
        else:
            self.isMain = False

        set_Output_Single(output_Signals['MAIN'],state)

    def toggle_Horn(self, state):
        set_Output_Single(output_Signals['HORN'],state)

    #Sounds horn for <sec> seconds
    #TODO: use timer tread instead of sleeps
    def Horn_passing(self, sec):
        toggle_Horn(ON)
        time.sleep(int(sec))
        toggle_Horn(OFF)

    def toggle_Engine_Start(self, state):
        set_Output_Single(output_Signals['HI_B'],state)

    #Run starter engine  for 3 seconds
    #TODO: use timer tread instead of sleep
    def engine_Start_passing(self):
        toggle_Engine_Start(ON)
        time.sleep(3)
        toggle_Engine_Start(OFF)


    def get_Signal_status(self, signals, status):
        status = dict()
        for signal in signals:
          status.update({singal,get_input_single(signal)})

        return status

    


def main():
    test_Serial = MCIoSer()
    test_Serial.setup_Serial(DEVICE)
    
if __name__ == "__main__":
    main()
