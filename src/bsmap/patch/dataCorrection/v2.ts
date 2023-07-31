import { Difficulty } from '../../beatmap/v2/difficulty';
import { Note } from '../../beatmap/v2/note';
import { Obstacle } from '../../beatmap/v2/obstacle';
import { Event } from '../../beatmap/v2/event';
import { Waypoint } from '../../beatmap/v2/waypoint';
import { Arc } from '../../beatmap/v2/arc';
import { fixFloat, fixInt } from './helpers';
import logger from '../../logger';
import { fixCustomDataObject } from './customDataObject';
import { fixCustomDataEvent } from './customDataEvent';

function fixNote(obj: Note) {
   obj.time = fixFloat(obj.time, Note.default._time);
   obj.type = fixInt(obj.type, [0, 3], [0, 1, 3]);
   obj.posX = fixInt(obj.posX, Note.default._lineIndex);
   obj.posY = fixInt(obj.posY, Note.default._lineLayer);
   obj.direction = fixInt(obj.direction, Note.default._cutDirection);
   fixCustomDataObject(obj.customData);
}

function fixObstacle(obj: Obstacle) {
   obj.time = fixFloat(obj.time, Obstacle.default._time);
   obj.type = fixInt(obj.type, Obstacle.default._type);
   obj.posX = fixInt(obj.posX, Obstacle.default._lineIndex);
   obj.duration = fixFloat(obj.duration, Obstacle.default._duration);
   obj.width = fixInt(obj.width, Obstacle.default._width);
   fixCustomDataObject(obj.customData);
}

function fixEvent(obj: Event) {
   obj.time = fixFloat(obj.time, Event.default._time);
   obj.type = fixInt(obj.type, Event.default._type);
   obj.value = fixInt(obj.value, Event.default._value);
   obj.floatValue = fixFloat(obj.floatValue, Event.default._floatValue);
   fixCustomDataEvent(obj.customData);
}

function fixWaypoint(obj: Waypoint) {
   obj.time = fixFloat(obj.time, Waypoint.default._time);
   obj.posX = fixInt(obj.posX, Waypoint.default._lineIndex);
   obj.posY = fixInt(obj.posY, Waypoint.default._lineLayer);
   obj.direction = fixInt(obj.direction, Waypoint.default._offsetDirection);
}

function fixArc(obj: Arc) {
   obj.color = fixInt(obj.color, Arc.default._colorType, [0, 1]);
   obj.time = fixFloat(obj.time, Arc.default._headTime);
   obj.posX = fixInt(obj.posX, Arc.default._headLineIndex);
   obj.posY = fixInt(obj.posY, Arc.default._headLineLayer);
   obj.direction = fixInt(obj.direction, Arc.default._headCutDirection);
   obj.lengthMultiplier = fixFloat(
      obj.lengthMultiplier,
      Arc.default._headControlPointLengthMultiplier,
   );
   obj.tailTime = fixFloat(obj.tailTime, Arc.default._tailTime);
   obj.tailPosX = fixInt(obj.tailPosX, Arc.default._tailLineIndex);
   obj.tailPosY = fixInt(obj.tailPosY, Arc.default._tailLineLayer);
   obj.tailDirection = fixInt(obj.tailDirection, Arc.default._tailCutDirection);
   obj.tailLengthMultiplier = fixFloat(
      obj.tailLengthMultiplier,
      Arc.default._tailControlPointLengthMultiplier,
   );
   obj.midAnchor = fixInt(obj.midAnchor, Arc.default._sliderMidAnchorMode);
}

export function v2(data: Difficulty) {
   logger.tInfo(
      ['patch', 'dataCorrection', 'difficulty', 'v2'],
      'Verifying and correcting data type for beatmap v2...',
   );

   data.colorNotes.forEach(fixNote);
   data.obstacles.forEach(fixObstacle);
   data.basicEvents.forEach(fixEvent);
   data.waypoints.forEach(fixWaypoint);
   data.arcs.forEach(fixArc);
}
