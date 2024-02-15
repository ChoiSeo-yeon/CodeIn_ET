import cv2
from gaze_tracking import GazeTracking
import keyboard

gaze = GazeTracking()
webcam = cv2.VideoCapture(0)

n = 0
while True:
    _, frame = webcam.read()
    text = ""

    gaze.refresh(frame)
    new_frame = gaze.annotated_frame()
    """HJ : 창의 크기 값 가져와서 가로/5, 세로/4 해서 (c_location, 30)의 값 바꿔서 점찍기"""
    if n <2 :
        if n==0 : 
            c_location = 150
        else : 
            c_location = 450
        text = "See Red Circle and Press \'ESC\' KEY"
        cv2.putText(new_frame, text, (15, 100), cv2.FONT_HERSHEY_PLAIN, 2, (0, 255, 0), 2)
        cv2.namedWindow('Setting', cv2.WINDOW_NORMAL)
        cv2.setWindowProperty('Setting', cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)
        window_size = cv2.getWindowImageRect('Setting')
        #print("circle location",int((window_size[2]/3)*(n+1)))
        cv2.circle(new_frame, (c_location, 30), 15, (0, 0, 255), -1, cv2.LINE_AA)
        cv2.imshow("Setting", new_frame)
       
    else :
        if gaze.is_right():
            text = "Looking right"
        elif gaze.is_left():
            text = "Looking left"
        elif gaze.is_center():
            text = "Looking center"

        cv2.putText(new_frame, text, (60, 60), cv2.FONT_HERSHEY_DUPLEX, 2, (255, 0, 0), 2)
        cv2.namedWindow('Demo', cv2.WINDOW_NORMAL)
        cv2.setWindowProperty('Demo', cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)
        cv2.imshow("Demo", new_frame)
    
    """HJ : 점 위치 마다 보는곳 위치 값 가져와서 리스트 안에 넣기 총 12개"""
    if cv2.waitKey(1) == 27:
        n = n+1
        if n == 1:
            print("Left Calculation")
            left_value = gaze.horizontal_ratio()
            continue
        elif n == 2:
            print("Right Calculation")
            right_value = gaze.horizontal_ratio()

            gaze.leftvalue = left_value
            gaze.rightvalue = right_value
            cv2.destroyWindow("Setting")
            
            continue
        else :
            print("left_value : ",  left_value)
            print("right_value : ",  right_value)
            cv2.destroyWindow("Demo")
            break