/*---------------------------------------------------------------------------*
 * Torigoya_Bookshelf.js v.1.2.1
 *---------------------------------------------------------------------------*
 * 2021/07/05 22:08 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MV
 * @plugindesc 文本书架书籍系统(v.1.2.1)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 1.2.1
 * @url https://raw.githubusercontent.com/rutan/torigoya-rpg-maker-plugin/gh-pages/Torigoya_Bookshelf.js
 * @help
 ====汉化：硕明云书=====
 * 文本书架书籍系统(v.1.2.1)
 * https://torigoya-plugin.rutan.dev
 *
  * 从文本文件创建书架场景。
  * 详细的使用方法请参见说明页面
 * https://torigoya-plugin.rutan.dev/system/bookshelf/
 *
   项目文件夹（比如与img文件夹平级的地方），请创建一个名为 
  bookshelf 
  的文件夹。 
   ------------------------------------------------------------ 
  ■ 使用方法 
  ------------------------------------------------------------ 
  1.创建一个文件夹来放置文本（根目录下创建）  
  bookshelf       
  
  2.创建文本.txt后缀文本文件  内容格式如下：
  
  
# 书架

## 《小学一年级语文》
日月水火
我会背古诗
-----
\bookPicture kebentu

## 《小学六年级英语》
hello!\c[2]hello!\c[0]hello!

  3. 符号运用
  #   //代表书架标题  
  ##  //代表书籍名
  -----  //划分书中页面
  \bookFace 显示脸图          例：\bookFace 文件名 n
  \bookFace 文件名, n, left   //左右对齐  left  right
  
您可以通过如下编写来显示书中的图片图像。
我肯定也会练习其中的 1 个。

\bookPicture 文件名
如果想使用子文件夹中的图片，可以这样写。
文件夹分隔符/是 .

\bookPicture   子文件夹的名称/文件名
您还可以\bookPicture 文件名,   图像的高度, 指定对齐方法，类似于以下的内容：

\bookPicture 文件名, 300, left
\bookPicture 文件名, 300, right
 
插件命令调用：本棚表示 001  //001代表文本名


创建仅在开关未开启时才显示的秘密书籍如果你按照下面的方法编写，
就能创建一个只有在开关未开启时才会显示的书籍。

## if($gameSwitches.value(1)): 《降龙十八掌》
你来得正是时候！这本书只有在开关1开启时才会显示哦！

## if(在这里输入JavaScript条件表达式):
注意，闭括号后面需要加上半角冒号（:）！
========================================
插件许可/规则
========================================
插件可以免费使用
用于游戏 → 确定
用于付费游戏或有年龄限制的游戏 → 可以
提交您参加比赛的游戏 → 确定
修改→确定
重新分配 → 确定


  
 * @param base
 * @text ■ 基础设置
 *
 *
 * @param bookshelfTitleFontSize
 * @text 书架名称的文字大小
 * @desc 本棚の名前のフォントサイズを指定します
 * @type number
 * @parent base
 * @min 1
 * @default 22
 *
 * @param bookshelfWidth
 * @text  书籍列表的横宽
 * @desc 指定书架界面书籍列表的横宽。如果是0，则使用全部UI区域。
 * @type number
 * @parent base
 * @min 0
 * @default 400
 *
 * @param bookshelfMaxHeight
 * @text 书籍列表的高度
 * @desc 指定书架界面书籍列表的最大纵深。如果是0，则使用全部UI区域。
 * @type number
 * @parent base
 * @min 0
 * @default 0
 *
 * @param bookContentFontSize
 * @text 书籍内容的文字大小
 * @desc 本の中身ウィンドウのフォントサイズを指定します。
 * @type number
 * @parent base
 * @min 1
 * @default 24
 *
 * @param bookContentWidth
 * @text 书籍内容的横宽
 * @desc 本の中身ウィンドウの横幅を指定します。
 * 0の場合、UI領域をすべて使用します。
 * @type number
 * @parent base
 * @min 0
 * @default 0
 *
 * @param bookContentHeight
 * @text 书籍内容的纵深
 * @desc 本の中身ウィンドウの縦幅を指定します。
 * 0の場合、UI領域をすべて使用します。
 * @type number
 * @parent base
 * @min 0
 * @default 0
 *
 * @param menu
 * @text ■ 菜单设置
 *
 * @param menuItems
 * @text  添加书架到菜单
 * @type struct<MenuItem>[]
 * @parent menu
 * @default []
 */

/*~struct~MenuItem:
 * @param name
 * @text 显示名称
 * @desc 在菜单中显示的名称
 * @type string
 * @default
 *
 * @param fileName
 * @text 文件名
 * @desc 请指定要读取的文本的文件名
  * 无需包含文件夹(bookshelf)的名称
 * @type string
 * @default
 *
 * @param switchId
 * @text 生效开关
 * @desc 设置只有当这个开关打开时才可以选择
 * 如果没有设置，那么总是可以选择
 * @type switch
 * @default 0
 *
 * @param visibility
 * @text 当无效时是否显示
 * @desc 设置当有效开关没有打开时
  * 是否在菜单中显示项
 * @type boolean
 * @on 显示
 * @off 不显示
 * @default true
 *
 * @param note
 * @text  备注
 * @desc 这是备注栏
 * 可以像使用制作工具的备注栏那样使用
 * @type note
 * @default
 */

/*~struct~MenuItem:
 * @param name
 * @text 显示名称
 * @desc メニューに表示される項目の名前
 * @type string
 * @default
 *
 * @param fileName
 * @text 文件名
 * @desc 请指定要加载的文本的文件名
  * 不需要包含文件夹(bookshelf)的名称
 * @type string
 * @default
 *
 * @param switchId
 * @text  有效开关
 * @desc  该开关开启时才可以选择
  * 如果没有设置，将始终可以选择
 * @type switch
 * @default 0
 *
 * @param visibility
 * @text 禁用时是否显示
 * @desc  设置当有效开关没有开启时
  * 是否在菜单中显示该项
 * @type boolean
 * @on 显示
 * @off 不显示
 * @default true
 *
 * @param note
 * @text 备注
 * @desc 这是备注栏
 * 可以像使用制作工具的备注栏一样使用
 * @type note
 * @default
  */
(function () {
    'use strict';

    const Torigoya = (window.Torigoya = window.Torigoya || {});

    function getPluginName() {
        const cs = document.currentScript;
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'Torigoya_Bookshelf';
    }

    function pickStringValueFromParameter(parameter, key, defaultValue = '') {
        if (!parameter.hasOwnProperty(key)) return defaultValue;
        return ''.concat(parameter[key] || '');
    }

    function pickIntegerValueFromParameter(parameter, key, defaultValue = 0) {
        if (!parameter.hasOwnProperty(key) || parameter[key] === '') return defaultValue;
        return parseInt(parameter[key], 10);
    }

    function pickBooleanValueFromParameter(parameter, key, defaultValue = 'false') {
        return ''.concat(parameter[key] || defaultValue) === 'true';
    }

    function pickJsonValueFromParameter(parameter, key) {
        if (!parameter[key]) return parameter[key];
        return JsonEx.parse(parameter[key]);
    }

    function pickStructMenuItem(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            name: pickStringValueFromParameter(parameter, 'name', ''),
            fileName: pickStringValueFromParameter(parameter, 'fileName', ''),
            switchId: pickIntegerValueFromParameter(parameter, 'switchId', 0),
            visibility: pickBooleanValueFromParameter(parameter, 'visibility', 'true'),
            note: pickJsonValueFromParameter(parameter, 'note'),
        };
    }

    function readParameter() {
        const parameter = PluginManager.parameters(getPluginName());
        return {
            version: '1.2.1',
            bookshelfTitleFontSize: pickIntegerValueFromParameter(parameter, 'bookshelfTitleFontSize', 22),
            bookshelfWidth: pickIntegerValueFromParameter(parameter, 'bookshelfWidth', 400),
            bookshelfMaxHeight: pickIntegerValueFromParameter(parameter, 'bookshelfMaxHeight', 0),
            bookContentFontSize: pickIntegerValueFromParameter(parameter, 'bookContentFontSize', 24),
            bookContentWidth: pickIntegerValueFromParameter(parameter, 'bookContentWidth', 0),
            bookContentHeight: pickIntegerValueFromParameter(parameter, 'bookContentHeight', 0),
            menuItems: ((parameters) => {
                parameters = parameters || [];
                if (typeof parameters === 'string') parameters = JSON.parse(parameters);
                return parameters.map((parameter) => {
                    return pickStructMenuItem(parameter);
                });
            })(parameter.menuItems),
        };
    }

    const titleRegexp = /^#(?!#)\s*(.+)$/;
    const bookTitleRegexp = /^##(?!#)\s*(?:if\((.+)\):)?\s*(.+)$/;
    const pageBorderRegexp = /^(?:-{3,}|_{3,})$/;

    class TextParser {
        parse(text) {
            const lines = text.split(/\r?\n/);
            return {
                title: this.parseBookshelfTitle(lines),
                books: this.parseBooks(lines),
            };
        }

        parseBookshelfTitle(lines) {
            const titleLine = lines.find((line) => line.match(titleRegexp));
            if (!titleLine) return '';
            return titleLine.match(titleRegexp)[1];
        }

        parseBooks(lines) {
            const books = [];
            lines = lines.slice(0);

            while (lines.length) {
                const line = lines.shift();

                const title = line.match(bookTitleRegexp);
                if (!title) continue;

                const contentLines = [];
                while (lines[0] !== undefined && !lines[0].match(bookTitleRegexp)) {
                    contentLines.push(lines.shift());
                }

                books.push({
                    title: title[2],
                    condition: title[1],
                    pages: this.parseBookContent(contentLines),
                });
            }

            return books;
        }

        parseBookContent(lines) {
            lines = lines.slice(0);
            const pages = [];

            while (lines.length) {
                const pageLines = [];
                while (lines[0] !== undefined && !lines[0].match(pageBorderRegexp)) {
                    pageLines.push(lines.shift());
                }
                pages.push(this.parsePage(pageLines));
                lines.shift();
            }

            return pages;
        }

        parsePage(lines) {
            return lines.join('\n').trim();
        }
    }

    class CustomFetchResponse {
        constructor(xhr) {
            this._xhr = xhr;
        }

        get status() {
            return this._xhr.status;
        }

        text() {
            return Promise.resolve(this._xhr.responseText);
        }

        json() {
            try {
                return Promise.resolve(JSON.parse(this._xhr.responseText));
            } catch (_) {
                return Promise.reject(this._xhr);
            }
        }
    }

    function customFetch(url, options = {}) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => (xhr.status < 400 ? resolve(new CustomFetchResponse(xhr)) : reject(xhr));
            xhr.onerror = () => reject(xhr);
            xhr.open(options.method || 'GET', url);
            xhr.send();
        });
    }

    function getAtsumaru() {
        return (typeof window === 'object' && window.RPGAtsumaru) || null;
    }

    function pushCommentContextFactor(str) {
        const client = getAtsumaru();
        if (!client) return;
        try {
            client.comment.pushContextFactor(str);
        } catch (_) {}
    }

    Torigoya.Bookshelf = {
        name: getPluginName(),
        parameter: readParameter(),
        TextParser,
        bookFileName: '',
    };

    function evalCondition(code) {
        try {
            return !!eval(code);
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    /**
     * 本棚の名前ウィンドウ
     */
    class Window_BookshelfTitle extends Window_Base {
        setTitle(title) {
            if (this._title === title) return;
            this._title = title;
            this.refresh();
        }

        refresh() {
            this.contents.clear();
            if (!this._title) return;

            this.resetFontSettings();
            this.drawText(this._title, 0, 0, this.contents.width, 'center');
        }

        standardFontSize() {
            return Torigoya.Bookshelf.parameter.bookshelfTitleFontSize;
        }

        lineHeight() {
            return Torigoya.Bookshelf.parameter.bookshelfTitleFontSize;
        }
    }

    Torigoya.Bookshelf.Window_BookshelfTitle = Window_BookshelfTitle;

    /**
     * 本棚の中の本タイトル一覧ウィンドウ
     */
    class Window_BooksList extends Window_Selectable {
        setBooks(books) {
            this._books = books;
            this.makeItemList();
            this.refresh();
        }

        makeItemList() {
            if (this._books) {
                this._data = this._books.filter((book) => {
                    if (!book.condition) return true;
                    return evalCondition(book.condition);
                });
            } else {
                this._data = [];
            }
        }

        item() {
            return this.itemAt(this.index());
        }

        itemAt(index) {
            return this._data ? this._data[index] : null;
        }

        maxItems() {
            return this._data ? this._data.length : 0;
        }

        drawItem(index) {
            const item = this.itemAt(index);
            if (!item) return;

            const rect = this.itemRect(index);
            this.drawText(item.title, rect.x, rect.y, rect.width, 'left');
        }
    }

    Torigoya.Bookshelf.Window_BooksList = Window_BooksList;

    /**
     * 本の中身を表示するウィンドウ
     */
    class Window_BookContent extends Window_Selectable {
        constructor(x, y, width, height) {
            super(x, y, width, height);
            this._waitLoadBitmaps = [];
            this._allTextHeight = 0;
            this._lastRenderPage = null;
        }

        setBook(book) {
            this._book = book;
            this.select(0);
            this.refresh();
        }

        standardFontSize() {
            return Torigoya.Bookshelf.parameter.bookContentFontSize;
        }

        _updateCursor() {
            this._windowCursorSprite.visible = false;
        }

        itemHeight() {
            return this.height - this.padding * 2;
        }

        maxItems() {
            return this._book ? this._book.pages.length : 0;
        }

        refresh() {
            this._waitLoadBitmaps.length = 0;
            super.refresh();
        }

        drawItem(index) {
            const page = this._book.pages[index];
            if (!page) return;

            // [アツマール限定]: コメントAPIに文章を反映
            if (this._lastRenderPage !== page) {
                pushCommentContextFactor(page);
                this._lastRenderPage = page;
            }

            const rect = this.itemRect(index);
            this.resetTextColor();
            this.drawTextEx(page, rect.x, rect.y, rect.width);
        }

        addWaitLoadBitmap(bitmap) {
            if (bitmap.isReady()) return;
            this._waitLoadBitmaps.push(bitmap);
            bitmap.addLoadListener(() => this.onLoadBitmap(bitmap));
        }

        onLoadBitmap(bitmap) {
            if (!this._waitLoadBitmaps.includes(bitmap)) return;

            this._waitLoadBitmaps = this._waitLoadBitmaps.filter((b) => b !== bitmap);
            if (this._waitLoadBitmaps.length === 0) {
                this.refresh();
            }
        }

        processEscapeCharacter(code, textState) {
            super.processEscapeCharacter(code, textState);

            switch (code) {
                case 'BOOKFACE': {
                    const [name, faceIndex, align] = this.torigoyaBookshelf_obtainArrayParam(textState);
                    if (name) this.processDrawBookFace(textState, name, parseInt(faceIndex), align);
                    break;
                }
                case 'BOOKPICTURE': {
                    const [name, align, height] = this.torigoyaBookshelf_obtainArrayParam(textState);
                    if (name) this.processDrawBookPicture(textState, name, align, height ? parseInt(height) : 0);
                    break;
                }
            }
        }

        torigoyaBookshelf_obtainArrayParam(textState) {
            const regExp = /^(.+)(\n|$)/; // 行末まで処理対象とする
            const arr = regExp.exec(textState.text.slice(textState.index));
            if (arr) {
                textState.index += arr[0].length - 1;
                return arr[1].split(/\s*,\s*/).map((n) => n.trim());
            } else {
                return [];
            }
        }

        processDrawBookFace(textState, faceName, faceIndex, align = 'center') {
            const bitmap = ImageManager.loadFace(faceName);

            if (bitmap.isReady()) {
                textState.x = 0;

                const faceWidth = Window_Base._faceWidth;
                const dx =
                    align === 'right'
                        ? textState.x + this.contents.width - faceWidth
                        : align === 'center'
                        ? textState.x + (this.contents.width - faceWidth) / 2
                        : textState.x;
                this.drawFace(faceName, faceIndex, dx, textState.y);
            } else {
                this.addWaitLoadBitmap(bitmap);
            }

            textState.height = Math.max(textState.height, Window_Base._faceHeight);
            this.processNewLine(textState);
        }

        processDrawBookPicture(textState, name, align = 'center', height = 0) {
            const bitmap = ImageManager.loadPicture(name);

            if (bitmap.isReady()) {
                textState.x = 0;

                let rate = 1;

                if (height <= 0) {
                    rate = Math.min(1, this.contents.width / bitmap.width);
                    height = bitmap.height * rate;
                } else {
                    rate = height / bitmap.height;
                }

                const dw = bitmap.width * rate;
                const dh = bitmap.height * rate;
                const dx =
                    align === 'right'
                        ? textState.x + this.contents.width - dw
                        : align === 'center'
                        ? textState.x + (this.contents.width - dw) / 2
                        : textState.x;

                this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, dx, textState.y, dw, dh);
            } else {
                this.addWaitLoadBitmap(bitmap);
            }

            textState.height = Math.max(textState.height, height);
            this.processNewLine(textState);
        }

        isOkEnabled() {
            return this.maxItems() > 0;
        }

        goPreviousPage() {
            if (this.index() > 0) {
                SoundManager.playCursor();
                this.select(this.index() - 1);
            }
        }

        goNextPage() {
            if (this.index() < this.maxItems() - 1) {
                SoundManager.playCursor();
                this.select(this.index() + 1);
            }
        }

        processOk() {
            if (this.index() < this.maxItems() - 1) {
                this.goNextPage();
            } else if (!Input.isTriggered('ok') && Input.isRepeated('ok'));
            else {
                this.playOkSound();
                this.callHandler('cancel');
            }
        }

        cursorUp(_) {
            super.cursorUp(false);
        }

        cursorDown(_) {
            super.cursorDown(false);
        }
    }

    Torigoya.Bookshelf.Window_BookContent = Window_BookContent;

    /**
     * 本棚シーン
     */
    class Scene_Bookshelf extends Scene_MenuBase {
        constructor() {
            super();
            this._fileName = '';
            this._bookshelf = null;
            this._fileName = Torigoya.Bookshelf.bookFileName;
        }

        create() {
            super.create();
            this.createTitleWindow();
            this.createBooksListWindow();
            this.createBookContentWindow();
            this.loadTextFile();
        }

        needsPageButtons() {
            return true;
        }

        arePageButtonsEnabled() {
            return this._bookContentWindow && this._bookContentWindow.active;
        }

        listWindowWidth() {
            return Torigoya.Bookshelf.parameter.bookshelfWidth || Graphics.boxWidth;
        }

        contentWindowWidth() {
            return Torigoya.Bookshelf.parameter.bookContentWidth || Graphics.boxWidth;
        }

        contentWindowHeight() {
            return Torigoya.Bookshelf.parameter.bookContentHeight || Graphics.boxHeight;
        }

        createTitleWindow() {
            const { x, y, width, height } = this.titleWindowRect();
            this._titleWindow = new Window_BookshelfTitle(x, y, width, height);
            this.addWindow(this._titleWindow);
        }

        titleWindowRect() {
            return new Rectangle(0, 0, this.listWindowWidth(), this.titleWindowHeight());
        }

        titleWindowHeight() {
            return Window_BookshelfTitle.prototype.fittingHeight(1);
        }

        createBooksListWindow() {
            const { x, y, width, height } = this.booksListWindowRect();
            this._booksListWindow = new Window_BooksList(x, y, width, height);
            this._booksListWindow.setHandler('ok', this.onBooksOk.bind(this));
            this._booksListWindow.setHandler('cancel', this.popScene.bind(this));
            this.addWindow(this._booksListWindow);
            this._booksListWindow.select(0);
            this._booksListWindow.activate();
        }

        booksListWindowRect() {
            return new Rectangle(0, 0, this.listWindowWidth(), this.maxBooksWindowHeight());
        }

        maxBooksWindowHeight() {
            return (
                Torigoya.Bookshelf.parameter.bookshelfMaxHeight ||
                Graphics.boxHeight - (this._bookshelf && this._bookshelf.title ? this.titleWindowHeight() : 0) - 1
            );
        }

        createBookContentWindow() {
            const { x, y, width, height } = this.bookContentWindowRect();
            this._bookContentWindow = new Window_BookContent(x, y, width, height);
            this._bookContentWindow.setHandler('cancel', this.onBookContentCancel.bind(this));
            this._bookContentWindow.hide();
            this._bookContentWindow.close();
            this.addWindow(this._bookContentWindow);
        }

        bookContentWindowRect() {
            const w = this.contentWindowWidth();
            const h = this.contentWindowHeight();
            const x = (Graphics.boxWidth - w) / 2;
            const y = (Graphics.boxHeight - h) / 2;
            return new Rectangle(x, y, w, h);
        }

        helpAreaHeight() {
            return 0;
        }

        loadTextFile() {
            if (!this._loader) {
                this._loader = ResourceHandler.createLoader(this.getFileUrl(), this.loadTextFile.bind(this));
            }

            customFetch(this.getFileUrl())
                .then((resp) => resp.text())
                .then((text) => {
                    const parser = new TextParser();
                    try {
                        this.onLoadSuccess(parser.parse(text));
                    } catch (e) {
                        console.error(e);
                        this.onParseError(e);
                    }
                })
                .catch(this._loader);
        }

        onLoadSuccess(bookshelf) {
            this._bookshelf = bookshelf;

            if (this._bookshelf.title) {
                this._titleWindow.setTitle(this._bookshelf.title);
                this._titleWindow.show();
            } else {
                this._titleWindow.hide();
            }
            this._booksListWindow.setBooks(this._bookshelf.books);

            this.adjustWindowPosition();
        }

        onParseError(e) {
            SceneManager.catchException(e);
        }

        adjustWindowPosition() {
            if (!this._bookshelf) return;

            const titleHeight = this._bookshelf.title ? this._titleWindow.height : 0;
            this._booksListWindow.height = Math.min(
                Window_Selectable.prototype.fittingHeight(this._booksListWindow.maxItems()),
                this.maxBooksWindowHeight()
            );

            const x = (Graphics.boxWidth - this.listWindowWidth()) / 2;
            const y = (Graphics.boxHeight - titleHeight - this._booksListWindow.height) / 2;
            this._titleWindow.x = x;
            this._titleWindow.y = y;
            this._booksListWindow.x = x;
            this._booksListWindow.y = y + titleHeight;
        }

        getFileUrl() {
            const hasExt = this._fileName.match(/\.[^\.\/]+$/);
            return 'bookshelf/'.concat(this._fileName).concat(hasExt ? '' : '.txt');
        }

        isReady() {
            return super.isReady() && !!this._bookshelf;
        }

        onBooksOk() {
            const book = this._booksListWindow.item();
            this._booksListWindow.deactivate();
            this._bookContentWindow.setBook(book);
            this._bookContentWindow.show();
            this._bookContentWindow.open();
            this._bookContentWindow.activate();
        }

        onBookContentCancel() {
            this._bookContentWindow.close();
            this._booksListWindow.activate();
        }
    }

    Torigoya.Bookshelf.Scene_Bookshelf = Scene_Bookshelf;

    (() => {
        // -------------------------------------------------------------------------
        // Window_MenuCommand

        const upstream_Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
        Window_MenuCommand.prototype.addOriginalCommands = function () {
            upstream_Window_MenuCommand_addOriginalCommands.apply(this);

            Torigoya.Bookshelf.parameter.menuItems.forEach((item, i) => {
                const enabled = item.switchId ? $gameSwitches.value(parseInt(item.switchId, 10)) : true;
                if (!enabled && !item.visibility) return;
                this.addCommand(item.name, 'TorigoyaBookshelf_'.concat(i), enabled);
            });
        };

        // -------------------------------------------------------------------------
        // Scene_Menu

        const upstream_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
        Scene_Menu.prototype.createCommandWindow = function () {
            upstream_Scene_Menu_createCommandWindow.apply(this);

            Torigoya.Bookshelf.parameter.menuItems.forEach((item, i) => {
                const fileName = item.fileName.trim();
                if (!fileName) return;

                this._commandWindow.setHandler('TorigoyaBookshelf_'.concat(i), () => {
                    Torigoya.Bookshelf.bookFileName = fileName;
                    SceneManager.push(Scene_Bookshelf);
                });
            });
        };

        // -------------------------------------------------------------------------
        // プラグインコマンド

        const upstream_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            switch (command) {
                case 'openBookshelf':
                case '本棚表示':
                    Torigoya.Bookshelf.bookFileName = ''.concat(args[0] || '').trim();
                    SceneManager.push(Scene_Bookshelf);
                    return;
            }

            upstream_Game_Interpreter_pluginCommand.apply(this, arguments);
        };
    })();
})();
