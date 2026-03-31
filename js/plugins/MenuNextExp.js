//=============================================================================
// MenuNextExp.js
//=============================================================================

/*:
 * @plugindesc 主菜单显示经验值
 * @author Jeremy Cannady
 *
 * @help 主菜单显示经验值所需
 *
 *
 *
*/

(function(){
var copyOfDrawActorSimpleStatus = Window_Base.prototype.drawActorSimpleStatus;

Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
	copyOfDrawActorSimpleStatus.call(this,actor,x,y,width);
	this.drawActorExp(actor, x, y + this.lineHeight() * 2);
};

Window_Base.prototype.drawActorExp = function(actor, x, y, width) {
    width = width || 150;
    this.changeTextColor(this.hpColor(actor));
    this.drawText("升级所需: " + actor.nextRequiredExp(), x, y, width, 'center');
};
})();