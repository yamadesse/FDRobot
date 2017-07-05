# -*- encoding: UTF-8 -*-
import sys
from naoqi import ALProxy
def StiffnessOn(proxy):
    pNames = "Body"
    pStiffnessLists = 1.0
    pTimeLists = 1.0
    proxy.stiffnessInterpolation(pNames, pStiffnessLists, pTimeLists)
def main(robotIP):
    # Init proxies.
    try:
        motionProxy = ALProxy("ALMotion", robotIP, 9559)
    except Exception, e:
        print "Could not create proxy to ALMotion"
        print "Error was: ", e
    try:
        postureProxy = ALProxy("ALRobotPosture", robotIP, 9559)
    except Exception, e:
        print "Could not create proxy to ALRobotPosture"
        print "Error was: ", e
    StiffnessOn(motionProxy)
    postureProxy.goToPosture("StandInit", 0.5)
    footStepsList = []
    footStepsList.append([["LLeg"], [[0.06, 0.1, 0.0]]])
    footStepsList.append([["LLeg"], [[0.00, 0.16, 0.0]]])
    footStepsList.append([["RLeg"], [[0.00, -0.1, 0.0]]])
    footStepsList.append([["LLeg"], [[0.00, 0.16, 0.0]]])
    footStepsList.append([["RLeg"], [[-0.04, -0.1, 0.0]]])
    footStepsList.append([["RLeg"], [[0.00, -0.16, 0.0]]])
    footStepsList.append([["LLeg"], [[0.00, 0.1, 0.0]]])
    footStepsList.append([["RLeg"], [[0.00, -0.16, 0.0]]])
    stepFrequency = 0.8
    clearExisting = False
    nbStepDance = 2 # defined the number of cycle to make
    for j in range( nbStepDance ):
        for i in range( len(footStepsList) ):
            motionProxy.setFootStepsWithSpeed(
                footStepsList[i][0],
                footStepsList[i][1],
                [stepFrequency],
                clearExisting)
if __name__ == "__main__":
    robotIp = "192.168.0.1"
    if len(sys.argv) <= 1:
        print "Usage python motion_setFootStepDance.py robotIP (optional default: 127.0.0.1)"
    else:
        robotIp = sys.argv[1]
    main(robotIp)
