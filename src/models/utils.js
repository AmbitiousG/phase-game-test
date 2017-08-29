export const ACTION_WALK_UP_FRAME_IDLE = 12*8;
export const ACTION_WALK_LEFT_FRAME_IDLE = 12*9;
export const ACTION_WALK_DOWN_FRAME_IDLE = 12*10;
export const ACTION_WALK_RIGHT_FRAME_IDLE = 12*11;

let walkFrameUp = [];
let walkFrameLeft = [];
let walkFrameDown = [];
let walkFrameRight = [];
for (var i = 1; i < 9; i++) {
    walkFrameUp.push(ACTION_WALK_UP_FRAME_IDLE + i);
    walkFrameLeft.push(ACTION_WALK_LEFT_FRAME_IDLE + i);
    walkFrameDown.push(ACTION_WALK_DOWN_FRAME_IDLE + i);
    walkFrameRight.push(ACTION_WALK_RIGHT_FRAME_IDLE + i);
}

export const ACTION_WALK_FRAMERATE = 10;

export const ACTION_WALK_UP = 'walkUp';
export const ACTION_WALK_UP_FRAMES = walkFrameUp;

export const ACTION_WALK_LEFT = 'walkLeft';
export const ACTION_WALK_LEFT_FRAMES = walkFrameLeft;

export const ACTION_WALK_DOWN = 'walkDown';
export const ACTION_WALK_DOWN_FRAMES = walkFrameDown;

export const ACTION_WALK_RIGHT = 'walkRight';
export const ACTION_WALK_RIGHT_FRAMES = walkFrameRight;
