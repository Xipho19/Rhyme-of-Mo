//=============================================================================
// MyFirstPlugin.js
//=============================================================================

/*:
 * @plugindesc 显示开发者信息（示例插件）
 * @author 你的名字
 * @help 这是一个简单的RPG Maker MV插件示例。
 * 在游戏中输入插件指令：ShowDevInfo，可以显示开发者信息。
 */

(function () {
  // 定义一个新的插件指令
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "ShowDevInfo") {
      // 显示开发者信息
      $gameMessage.add("游戏开发者：侯博轩");
      $gameMessage.add("版本：1.0.0");
      $gameMessage.add("联系方式：your_email@example.com");
      // 打开消息窗口
      $gameMap._interpreter.setWaitMode("message");
    }
  };
})();