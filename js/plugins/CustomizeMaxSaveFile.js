//=============================================================================
// CustomizeMaxSaveFile.js
// ----------------------------------------------------------------------------
// Copyright (c) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.1 2017/02/25 セーブファイル数により大きな値を設定できるよう上限を開放
// 1.1.0 2016/11/03 オートセーブなど最大数以上のIDに対してセーブするプラグインとの競合に対応
// 1.0.0 2016/03/19 初版
// ----------------------------------------------------------------------------
// [Blog]   : http://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 自定义最大存档数
 * @author triacontane
 *
 * @param SaveFileNumber
 * @text 保存数
 * @desc max save file number(1...100)
 * @default 20
 *
 * @help 自定义最大保存文件数
*
*无插件命令
*
*此插件在MIT许可证下发布。

*使用条款：
*可擅自修改、再分发给作者，使用形式（商用、18禁使用等）
*不受限制。
*此插件已属于您。

 */
/*:ja
 * @plugindesc 最大セーブファイル数変更プラグイン
 * @author トリアコンタン
 *
 * @param セーブファイル数
 * @desc 最大セーブファイル数です。
 * @default 20
 *
 * @help 最大セーブファイル数をパラメータで指定した値に変更します。
 *
 * このプラグインにはプラグインコマンドはありません。
 *
*使用条款：
*可擅自修改、再分发给作者，使用形式（商用、18禁使用等）
*不受限制。
*此插件已属于您。
 */

(function () {
    'use strict';
    var pluginName = 'CustomizeMaxSaveFile';

    var getParamNumber = function(paramNames, min, max) {
        var value = getParamOther(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value, 10) || 0).clamp(min, max);
    };

    var getParamOther = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };
    var paramSaveFileNumber = getParamNumber(['SaveFileNumber', 'セーブファイル数'], 0);

    //=============================================================================
    // DataManager
    //  セーブファイルの数をカスタマイズします。
    //=============================================================================
    var _DataManager_loadGlobalInfo = DataManager.loadGlobalInfo;
    DataManager.loadGlobalInfo = function() {
        if (!this._globalInfo) {
            this._globalInfo = _DataManager_loadGlobalInfo.apply(this, arguments);
        }
        return this._globalInfo;
    };

    var _DataManager_saveGlobalInfo = DataManager.saveGlobalInfo;
    DataManager.saveGlobalInfo = function(info) {
        _DataManager_saveGlobalInfo.apply(this, arguments);
        this._globalInfo = null;
    };

    var _DataManager_maxSavefiles = DataManager.maxSavefiles;
    DataManager.maxSavefiles = function() {
        return paramSaveFileNumber ? paramSaveFileNumber : _DataManager_maxSavefiles.apply(this, arguments);
    };

    var _DataManager_isThisGameFile = DataManager.isThisGameFile;
    DataManager.isThisGameFile = function(savefileId) {
        if (savefileId > this.maxSavefiles()) {
            return false;
        } else {
            return _DataManager_isThisGameFile.apply(this, arguments);
        }
    };
})();

