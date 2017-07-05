goog.provide('Blockly.Python.robot');

goog.require('Blockly.Python');
Blockly.Python['robot_walk'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = '# -*- encoding: UTF-8 -*-\n'+
'import math\n'+
'import almath as m # python\'s wrapping of almath\n'+
'import sys\n'+
'from naoqi import ALProxy\n'+
'def StiffnessOn(proxy):\n'+
'    # We use the "Body" name to signify the collection of all joints\n'+
'    pNames = "Body"\n'+
'    pStiffnessLists = 1.0\n'+
'    pTimeLists = 1.0\n'+
'    proxy.stiffnessInterpolation(pNames, pStiffnessLists, pTimeLists)\n'+
'def main(robotIP):\n'+
'    try:\n'+
'        motionProxy = ALProxy("ALMotion", robotIP, 9559)\n'+
'    except Exception, e:\n'+
'        print "Could not create proxy to ALMotion"\n'+
'        print "Error was: ", e\n'+
'    StiffnessOn(motionProxy)\n'+
'    motionProxy.setWalkArmsEnabled(True, True)\n'+
'    motionProxy.setMotionConfig([["ENABLE_FOOT_CONTACT_PROTECTION", True]])\n'+
'    initRobotPosition = m.Pose2D(motionProxy.getRobotPosition(False))\n'+
'    X = 0.3\n'+
'    Y = 0.1\n'+
'    Theta = math.pi/2.0\n'+
'    motionProxy.post.moveTo(X, Y, Theta)\n'+
'    motionProxy.waitUntilMoveIsFinished()\n'+
'    endRobotPosition = m.Pose2D(motionProxy.getRobotPosition(False))\n'+
'    robotMove = m.pose2DInverse(initRobotPosition)*endRobotPosition\n'+
'    print "Robot Move :", robotMove\n'+
'if __name__ == "__main__":\n'+
'    robotIp = "192.168.0.1"\n'+
'    if len(sys.argv) <= 1:\n'+
'        print "Usage python motion_moveTo.py robotIP (optional default: 127.0.0.1)"\n'+
'    else:\n'+
'        robotIp = sys.argv[1]\n'+
'    main(robotIp)';
  return code;
};

Blockly.Python['robot_dance'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = '# -*- encoding: UTF-8 -*-\n'+
'import sys\n'+
'from naoqi import ALProxy\n'+
'def StiffnessOn(proxy):\n'+
'    pNames = "Body"\n'+
'    pStiffnessLists = 1.0\n'+
'    pTimeLists = 1.0\n'+
'    proxy.stiffnessInterpolation(pNames, pStiffnessLists, pTimeLists)\n'+
'def main(robotIP):\n'+
'    # Init proxies.\n'+
'    try:\n'+
'        motionProxy = ALProxy("ALMotion", robotIP, 9559)\n'+
'    except Exception, e:\n'+
'        print "Could not create proxy to ALMotion"\n'+
'        print "Error was: ", e\n'+
'    try:\n'+
'        postureProxy = ALProxy("ALRobotPosture", robotIP, 9559)\n'+
'    except Exception, e:\n'+
'        print "Could not create proxy to ALRobotPosture"\n'+
'        print "Error was: ", e\n'+
'    StiffnessOn(motionProxy)\n'+
'    postureProxy.goToPosture("StandInit", 0.5)\n'+
'    footStepsList = []\n'+
'    footStepsList.append([["LLeg"], [[0.06, 0.1, 0.0]]])\n'+
'    footStepsList.append([["LLeg"], [[0.00, 0.16, 0.0]]])\n'+
'    footStepsList.append([["RLeg"], [[0.00, -0.1, 0.0]]])\n'+
'    footStepsList.append([["LLeg"], [[0.00, 0.16, 0.0]]])\n'+
'    footStepsList.append([["RLeg"], [[-0.04, -0.1, 0.0]]])\n'+
'    footStepsList.append([["RLeg"], [[0.00, -0.16, 0.0]]])\n'+
'    footStepsList.append([["LLeg"], [[0.00, 0.1, 0.0]]])\n'+
'    footStepsList.append([["RLeg"], [[0.00, -0.16, 0.0]]])\n'+
'    stepFrequency = 0.8\n'+
'    clearExisting = False\n'+
'    nbStepDance = 2 # defined the number of cycle to make\n'+
'    for j in range( nbStepDance ):\n'+
'        for i in range( len(footStepsList) ):\n'+
'            motionProxy.setFootStepsWithSpeed(\n'+
'                footStepsList[i][0],\n'+
'                footStepsList[i][1],\n'+
'                [stepFrequency],\n'+
'                clearExisting)\n'+
'if __name__ == "__main__":\n'+
'    robotIp = "192.168.0.1"\n'+
'    if len(sys.argv) <= 1:\n'+
'        print "Usage python motion_setFootStepDance.py robotIP (optional default: 127.0.0.1)"\n'+
'    else:\n'+
'        robotIp = sys.argv[1]\n'+
'    main(robotIp)\n';
  return code;
};


Blockly.Python['robot_hula'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = '# -*- encoding: UTF-8 -*-\n'+ 
'import sys\n'+ 
'import motion\n'+ 
'import almath\n'+ 
'from naoqi import ALProxy\n'+ 
'def StiffnessOn(proxy):\n'+ 
'    pNames = "Body"\n'+ 
'    pStiffnessLists = 1.0\n'+ 
'    pTimeLists = 1.0\n'+ 
'    proxy.stiffnessInterpolation(pNames, pStiffnessLists, pTimeLists)\n'+ 
'def main(robotIP):\n'+ 
'    try:\n'+ 
'        motionProxy = ALProxy("ALMotion", robotIP, 9559)\n'+ 
'    except Exception, e:\n'+ 
'        print "Could not create proxy to ALMotion"\n'+ 
'        print "Error was: ", e\n'+ 
'    try:\n'+ 
'        postureProxy = ALProxy("ALRobotPosture", robotIP, 9559)\n'+ 
'    except Exception, e:\n'+ 
'        print "Could not create proxy to ALRobotPosture"\n'+ 
'        print "Error was: ", e\n'+ 
'    StiffnessOn(motionProxy)\n'+ 
'    postureProxy.goToPosture("StandInit", 0.5)\n'+ 
'    dx         = 0.07                    # translation axis X (meter)\n'+ 
'    dy         = 0.07                    # translation axis Y (meter)\n'+ 
'    dwx        = 0.15                    # rotation axis X (rad)\n'+ 
'    dwy        = 0.15                    # rotation axis Y (rad)\n'+ 
'    path = [ [+dx, 0.0, 0.0,  0.0, -dwy, 0.0],  # point 01 : forward  / bend backward\n'+ 
'             [0.0, -dy, 0.0, -dwx,  0.0, 0.0],  # point 02 : right    / bend left\n'+ 
'             [-dx, 0.0, 0.0,  0.0,  dwy, 0.0],  # point 03 : backward / bend forward\n'+ 
'             [0.0, +dy, 0.0,  dwx,  0.0, 0.0],  # point 04 : left     / bend right\n'+ 
'             [+dx, 0.0, 0.0,  0.0, -dwy, 0.0],  # point 01 : forward  / bend backward\n'+ 
'             [0.0, -dy, 0.0, -dwx,  0.0, 0.0],  # point 02 : right    / bend left\n'+ 
'             [-dx, 0.0, 0.0,  0.0,  dwy, 0.0],  # point 03 : backward / bend forward\n'+ 
'             [0.0, +dy, 0.0,  dwx,  0.0, 0.0],  # point 04 : left     / bend right\n'+ 
'             [+dx, 0.0, 0.0,  0.0, -dwy, 0.0],  # point 05 : forward  / bend backward\n'+ 
'             [0.0, 0.0, 0.0,  0.0,  0.0, 0.0] ] # point 06 : Back to init pose\n'+ 
'    timeOneMove  = 0.4 #seconds\n'+ 
'    times = []\n'+ 
'    for i in range(len(path)):\n'+ 
'        times.append( (i%2B1)*timeOneMove )\n'+ 
'    effector   = "Torso"\n'+ 
'    space      =  motion.FRAME_ROBOT\n'+ 
'    axisMask   = almath.AXIS_MASK_ALL\n'+ 
'    isAbsolute = False\n'+ 
'    motionProxy.positionInterpolation(effector, space, path,\n'+ 
'                                      axisMask, times, isAbsolute)\n'+ 
'if __name__ == "__main__":\n'+ 
'    robotIp = "192.168.0.1"\n'+ 
'    if len(sys.argv) <= 1:\n'+ 
'        print "Usage python motion_hulaHoop.py robotIP (optional default: 127.0.0.1)"\n'+ 
'    else:\n'+ 
'        robotIp = sys.argv[1]\n'+ 
'    main(robotIp)\n';
  return code;
};

Blockly.Python['robot_motion'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = '# -*- encoding: UTF-8 -*-\n'+
'import sys\n'+
'import motion\n'+
'import almath\n'+
'import time\n'+
'from naoqi import ALProxy\n'+
'def StiffnessOn(proxy):\n'+
'    pNames = "Body"\n'+
'    pStiffnessLists = 1.0\n'+
'    pTimeLists = 1.0\n'+
'    proxy.stiffnessInterpolation(pNames, pStiffnessLists, pTimeLists)\n'+
'def main(robotIP):\n'+
'    try:\n'+
'        proxy = ALProxy("ALMotion", robotIP, 9559)\n'+
'    except Exception, e:\n'+
'        print "Could not create proxy to ALMotion"\n'+
'        print "Error was: ", e\n'+
'    try:\n'+
'        postureProxy = ALProxy("ALRobotPosture", robotIP, 9559)\n'+
'    except Exception, e:\n'+
'        print "Could not create proxy to ALRobotPosture"\n'+
'        print "Error was: ", e\n'+
'    StiffnessOn(proxy)\n'+
'    postureProxy.goToPosture("StandInit", 0.5)\n'+
'    isEnabled  = True\n'+
'    proxy.wbEnable(isEnabled)\n'+
'    stateName  = "Fixed"\n'+
'    supportLeg = "Legs"\n'+
'    proxy.wbFootState(stateName, supportLeg)\n'+
'    isEnable   = True\n'+
'    supportLeg = "Legs"\n'+
'    proxy.wbEnableBalanceConstraint(isEnable, supportLeg)\n'+
'    effectorList = ["LArm", "RArm"]\n'+
'    space        = motion.FRAME_ROBOT\n'+
'    pathList     = [\n'+
'                    [\n'+
'                     [0.0,   0.08,  0.14, 0.0, 0.0, 0.0], # target 1 for "LArm"\n'+
'                     [0.0,  -0.05, -0.07, 0.0, 0.0, 0.0], # target 2 for "LArm"\n'+
'                     [0.0,   0.08,  0.14, 0.0, 0.0, 0.0], # target 3 for "LArm"\n'+
'                     [0.0,  -0.05, -0.07, 0.0, 0.0, 0.0], # target 4 for "LArm"\n'+
'                     [0.0,   0.08,  0.14, 0.0, 0.0, 0.0], # target 5 for "LArm"\n'+
'                     ],\n'+
'                    [\n'+
'                     [0.0,   0.05, -0.07, 0.0, 0.0, 0.0], # target 1 for "RArm"\n'+
'                     [0.0,  -0.08,  0.14, 0.0, 0.0, 0.0], # target 2 for "RArm"\n'+
'                     [0.0,   0.05, -0.07, 0.0, 0.0, 0.0], # target 3 for "RArm"\n'+
'                     [0.0,  -0.08,  0.14, 0.0, 0.0, 0.0], # target 4 for "RArm"\n'+
'                     [0.0,   0.05, -0.07, 0.0, 0.0, 0.0], # target 5 for "RArm"\n'+
'                     [0.0,  -0.08,  0.14, 0.0, 0.0, 0.0], # target 6 for "RArm"\n'+
'                     ]\n'+
'                    ]\n'+

'    axisMaskList = [almath.AXIS_MASK_VEL, # for "LArm"\n'+
'                    almath.AXIS_MASK_VEL] # for "RArm"\n'+
'    coef       = 1.5\n'+
'    timesList  = [ [coef*(i%2B1) for i in range(5)],  # for "LArm" in seconds\n'+
'                   [coef*(i%2B1) for i in range(6)] ] # for "RArm" in seconds\n'+
'    isAbsolute   = False\n'+
'    proxy.positionInterpolations(effectorList, space, pathList,\n'+
'                                axisMaskList, timesList, isAbsolute)\n'+
'    effectorList = ["Torso", "LArm", "RArm"]\n'+
'    dy = 0.06\n'+
'    dz = 0.06\n'+
'    pathList     = [\n'+
'                    [\n'+
'                     [0.0, +dy, -dz, 0.0, 0.0, 0.0], # target  1 for "Torso"\n'+
'                     [0.0, 0.0, 0.0, 0.0, 0.0, 0.0], # target  2 for "Torso"\n'+
'                     [0.0, -dy, -dz, 0.0, 0.0, 0.0], # target  3 for "Torso"\n'+
'                     [0.0, 0.0, 0.0, 0.0, 0.0, 0.0], # target  4 for "Torso"\n'+
'                     [0.0, +dy, -dz, 0.0, 0.0, 0.0], # target  5 for "Torso"\n'+
'                     [0.0, 0.0, 0.0, 0.0, 0.0, 0.0], # target  6 for "Torso"\n'+
'                     [0.0, -dy, -dz, 0.0, 0.0, 0.0], # target  7 for "Torso"\n'+
'                     [0.0, 0.0, 0.0, 0.0, 0.0, 0.0], # target  8 for "Torso"\n'+
'                     [0.0, +dy, -dz, 0.0, 0.0, 0.0], # target  9 for "Torso"\n'+
'                     [0.0, 0.0, 0.0, 0.0, 0.0, 0.0], # target 10 for "Torso"\n'+
'                     [0.0, -dy, -dz, 0.0, 0.0, 0.0], # target 11 for "Torso"\n'+
'                     [0.0, 0.0, 0.0, 0.0, 0.0, 0.0], # target 12 for "Torso"\n'+
'                     ],\n'+
'                    [[0.0, 0.0, 0.0, 0.0, 0.0, 0.0]], # for "LArm"\n'+
'                    [[0.0, 0.0, 0.0, 0.0, 0.0, 0.0]], # for "LArm"\n'+
'                   ]\n'+
'    axisMaskList = [almath.AXIS_MASK_ALL, # for "Torso"\n'+
'                    almath.AXIS_MASK_VEL, # for "LArm"\n'+
'                    almath.AXIS_MASK_VEL] # for "RArm"\n'+
'    coef       = 0.5\n'+
'    timesList  = [\n'+
'                  [coef*(i%2B1) for i in range(12)], # for "Torso" in seconds\n'+
'                  [coef*12],                       # for "LArm" in seconds\n'+
'                  [coef*12]                      # for "RArm" in seconds\n'+
'                 ]\n'+
'    isAbsolute   = False\n'+
'    proxy.positionInterpolations(effectorList, space, pathList,\n'+
'                                 axisMaskList, timesList, isAbsolute)\n'+
'    isEnabled    = False\n'+
'    proxy.wbEnable(isEnabled)\n'+
'    postureProxy.goToPosture("StandInit", 0.5)\n'+
'if __name__ == "__main__":\n'+
'    robotIp = "192.168.0.1"\n'+
'    if len(sys.argv) <= 1:\n'+
'        print "Usage python motion_wbMultipleEffectors.py robotIP (optional default: 127.0.0.1)"\n'+
'    else:\n'+
'        robotIp = sys.argv[1]\n'+
'    main(robotIp)\n';
  return code;
};

Blockly.Python['robot_balance'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = '# -*- encoding: UTF-8 -*- \n'+
'import sys\n'+
'import motion\n'+
'import time\n'+
'import math\n'+
'from naoqi import ALProxy\n'+
'def StiffnessOn(proxy):\n'+
'    pNames = "Body"\n'+
'    pStiffnessLists = 1.0\n'+
'    pTimeLists = 1.0\n'+
'    proxy.stiffnessInterpolation(pNames, pStiffnessLists, pTimeLists)\n'+
'def main(robotIP):\n'+
'    try:\n'+
'        proxy = ALProxy("ALMotion", robotIP, 9559)\n'+
'    except Exception, e:\n'+
'        print "Could not create proxy to ALMotion"\n'+
'        print "Error was: ", e\n'+
'    try:\n'+
'        postureProxy = ALProxy("ALRobotPosture", robotIP, 9559)\n'+
'    except Exception, e:\n'+
'        print "Could not create proxy to ALRobotPosture"\n'+
'        print "Error was: ", e\n'+
'    StiffnessOn(proxy)\n'+
'    postureProxy.goToPosture("StandInit", 0.5)\n'+
'    isEnabled  = True\n'+
'    proxy.wbEnable(isEnabled)\n'+
'    stateName  = "Fixed"\n'+
'    supportLeg = "Legs"\n'+
'    proxy.wbFootState(stateName, supportLeg)\n'+
'    isEnable   = True\n'+
'    supportLeg = "Legs"\n'+
'    proxy.wbEnableBalanceConstraint(isEnable, supportLeg)\n'+
'    supportLeg = "LLeg"\n'+
'    duration   = 2.0\n'+
'    proxy.wbGoToBalance(supportLeg, duration)\n'+
'    stateName  = "Free"\n'+
'    supportLeg = "RLeg"\n'+
'    proxy.wbFootState(stateName, supportLeg)\n'+
'    effectorName = "RLeg"\n'+
'    axisMask     = 63\n'+
'    space        = motion.FRAME_ROBOT\n'+
'    dx      = 0.05                 # translation axis X (meters)\n'+
'    dz      = 0.05                 # translation axis Z (meters)\n'+
'    dwy     = 5.0*math.pi/180.0    # rotation axis Y (radian)\n'+
'    times   = [2.0, 2.7, 4.5]\n'+
'    isAbsolute = False\n'+
'    targetList = [\n'+
'      [-dx, 0.0, dz, 0.0, +dwy, 0.0],\n'+
'      [+dx, 0.0, dz, 0.0, 0.0, 0.0],\n'+
'      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]]\n'+
'    proxy.positionInterpolation(effectorName, space, targetList,\n'+
'                                 axisMask, times, isAbsolute)\n'+
'    isActive     = False\n'+
'    proxy.wbEnableEffectorOptimization(effectorName, isActive)\n'+
'    supportLeg = "RLeg"\n'+
'    duration   = 2.0\n'+
'    proxy.wbGoToBalance(supportLeg, duration)\n'+
'    stateName  = "Free"\n'+
'    supportLeg = "LLeg"\n'+
'    proxy.wbFootState(stateName, supportLeg)\n'+
'    effectorName = "LLeg"\n'+
'    proxy.positionInterpolation(effectorName, space, targetList,\n'+
'                                axisMask, times, isAbsolute)\n'+
'    time.sleep(1.0)\n'+
'    isEnabled    = False\n'+
'    proxy.wbEnable(isEnabled)\n'+
'    postureProxy.goToPosture("StandInit", 0.5)\n'+
'if __name__ == "__main__":\n'+
'    robotIp = "192.168.0.1"\n'+
'    if len(sys.argv) <= 1:\n'+
'        print "Usage python motion_wbKick.py robotIP (optional default: 127.0.0.1)"\n'+
'    else:\n'+
'        robotIp = sys.argv[1]\n'+
'    main(robotIp)\n';
  return code;
};