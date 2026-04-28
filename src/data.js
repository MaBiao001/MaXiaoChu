export const categories = [
  { id: 'all', name: '全部', icon: '🍽️' },
  { id: 'dazhun', name: '大荤', icon: '🥩' },
  { id: 'xiaozhun', name: '小荤', icon: '🍗' },
  { id: 'sucai', name: '素菜', icon: '🥬' },
  { id: 'liangban', name: '凉拌', icon: '🥗' },
  { id: 'zhushi', name: '主食', icon: '🍚' },
  { id: 'yinpin', name: '饮品', icon: '🍹' },
]

export const defaultDishes = [
  {
      "id": 1,
      "category": "dazhun",
      "name": "酱焖小鱼",

      "price": 20,
      "image": "https://i.ibb.co/p65dPs6R/image.jpg",
      "description": "小鱼鲜嫩可口入味，非常好吃",

      "ingredients": [
        "小鱼",
        "洋葱",
        "干辣椒",
        "啤酒",
        "姜片",
        "葱花"
      ],

      "steps": [
        "小鱼洗净，改花刀，放入盆中加盐、生抽、老抽、蚝油、味精腌制十分钟",
        "起锅烧油，放入姜片、小葱，干辣椒炒，然后放入切好的洋葱片打底",
        "腌制好的小鱼摆在洋葱上面，加入啤酒没过小鱼",
        "焖制十分钟，加入调料，撒入葱花，出锅"
      ],

    },
    {
      "id": 2,
      "category": "xiaozhun",
      "name": "青椒腊肠炒蛋",

      "price": 20,
      "image": "https://i.ibb.co/8Dfy0D4W/image.jpg",
      "description": "香辣可口很下饭",

      "ingredients": [
        "青椒",
        "腊肠",
        "鸡蛋",
        "小米辣",
        "姜末",
        "蒜末"
      ],

      "steps": [
        "腊肠切片，青椒切块儿，两个鸡蛋打散",
        "热锅少油，先炒鸡蛋盛出备用",
        "再放入小米辣、蒜末、姜末爆炒，加入豆瓣酱炒出油，然后下入腊肠和青椒块儿",
        "到会鸡蛋，加入一点蚝油、生抽，南德和十三香调料",
        "最后扒拉几下出锅"
      ],

    },
    {
      "id": 3,
      "category": "dazhun",
      "name": "莴笋炒腊肉",

      "price": 88,
      "image": "https://i.ibb.co/dwNJptVF/image.jpg",
      "description": "莴笋爽脆可口，腊肉香咸下饭",

      "ingredients": [
        "莴笋",
        "腊肉",
        "青椒",
        "小米辣",
        "姜末",
        "蒜末"
      ],

      "steps": [
        "腊肉煸炒出油，放入小米辣、姜末、蒜末爆炒",
        "放入切好的莴笋大火翻炒1分钟",
        "放入南德调料、十三香，再放入切好的青椒块儿，快速翻炒出锅"
      ],

    },
    {
      "id": 4,
      "category": "sucai",
      "name": "腐竹菠菜炒蛋",

      "price": 20,
      "image": "https://i.ibb.co/C55mQ5dX/image.jpg",
      "description": "腐竹软韧、菠菜鲜嫩、鸡蛋香软营养一锅出",

      "ingredients": [
        "腐竹",
        "菠菜",
        "鸡蛋",
        "蒜末",
        "小米辣"
      ],

      "steps": [
        "泡好的腐竹切段，菠菜洗净，分别焯水捞出备用",
        "起锅烧油鸡蛋打散炒出备用",
        "锅中倒入少量油，下小米辣、蒜末爆香，倒入腐竹和菠菜翻炒",
        "倒回鸡蛋，加少量盐、生抽，大火翻炒均匀出锅"
      ],

    },
    {
      "id": 5,
      "category": "xiaozhun",
      "name": "肉末麻辣豆腐",

      "price": 32,
      "image": "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?w=400&h=400&fit=crop",
      "description": "豆腐嫩滑，麻辣鲜香，下饭神器",

      "ingredients": [
        "嫩豆腐",
        "肉末",
        "豆瓣酱",
        "花椒粉",
        "蒜末",
        "青蒜苗"
      ],

      "steps": [
        "嫩豆腐切成2厘米见方的块，淡盐水焯烫去豆腥",
        "肉末下锅煸酥，加入豆瓣酱炒出红油",
        "加入高汤烧开，放入豆腐，中小火烧3分钟",
        "分三次淋入水淀粉勾芡，推匀",
        "盛盘后撒花椒粉、青蒜苗碎"
      ],

    },
    {
      "id": 6,
      "category": "xiaozhun",
      "name": "虾仁滑蛋",

      "price": 48,
      "image": "https://images.unsplash.com/photo-1559058789-672da06263d8?w=400&h=400&fit=crop",
      "description": "虾仁Q弹，鸡蛋滑嫩，清淡鲜美",

      "ingredients": [
        "鲜虾仁",
        "鸡蛋",
        "牛奶",
        "葱花",
        "料酒",
        "白胡椒"
      ],

      "steps": [
        "虾仁去虾线，加盐、料酒、白胡椒腌制10分钟",
        "鸡蛋打散，加入少许牛奶、盐搅匀",
        "虾仁沸水焯烫30秒至变色捞出",
        "热油下蛋液，待底部凝固时倒入虾仁",
        "用铲子轻推至蛋刚凝固即出锅"
      ],

    },
    {
      "id": 7,
      "category": "sucai",
      "name": "干煸四季豆",

      "price": 28,
      "image": "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=400&h=400&fit=crop",
      "description": "外皮微皱，干香入味，佐酒佳品",

      "ingredients": [
        "四季豆",
        "肉末",
        "干辣椒",
        "芽菜",
        "蒜末",
        "花椒"
      ],

      "steps": [
        "四季豆去筋掰段，沥干水分",
        "油温七成热，四季豆炸至表皮起皱捞出",
        "锅留底油，炒香肉末、芽菜、干辣椒",
        "倒入四季豆，加盐、糖大火翻炒均匀",
        "撒蒜末、花椒粉，出锅装盘"
      ],

    },
    {
      "id": 8,
      "category": "sucai",
      "name": "地三鲜",

      "price": 26,
      "image": "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400&h=400&fit=crop",
      "description": "东北经典，土豆软糯，茄子入味，青椒爽脆",

      "ingredients": [
        "茄子",
        "土豆",
        "青椒",
        "蒜末",
        "生抽",
        "蚝油"
      ],

      "steps": [
        "茄子切滚刀块，土豆切厚片，青椒掰块",
        "茄子和土豆分别过油炸至金黄",
        "锅留底油，爆香蒜末，下青椒略炒",
        "倒入茄子和土豆，加入调料翻炒均匀",
        "勾芡收汁，淋明油增亮出锅"
      ],

    },
    {
      "id": 9,
      "category": "sucai",
      "name": "蒜蓉西兰花",

      "price": 22,
      "image": "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&h=400&fit=crop",
      "description": "翠绿清爽，蒜香浓郁，健康低脂",

      "ingredients": [
        "西兰花",
        "大蒜",
        "生抽",
        "蚝油",
        "盐",
        "香油"
      ],

      "steps": [
        "西兰花切小朵，盐水浸泡10分钟后洗净",
        "沸水加少许油和盐，西兰花焯烫1分钟捞出",
        "大蒜剁成蒜蓉",
        "热油下蒜蓉小火煸至微黄出香",
        "倒入西兰花，加蚝油、生抽快速翻炒均匀"
      ],

    },
    {
      "id": 10,
      "category": "liangban",
      "name": "凉拌黄瓜",

      "price": 16,
      "image": "https://images.unsplash.com/photo-1606850780554-b55ea2ce98e7?w=400&h=400&fit=crop",
      "description": "拍松入味，酸辣爽口，开胃首选",

      "ingredients": [
        "黄瓜",
        "大蒜",
        "香醋",
        "辣椒油",
        "花椒油",
        "白糖"
      ],

      "steps": [
        "黄瓜洗净拍松，切成不规则块状",
        "加盐腌制10分钟，倒掉多余水分",
        "加入蒜泥、香醋、白糖、辣椒油、花椒油",
        "拌匀后放入冰箱冷藏15分钟",
        "取出装盘，撒少许熟芝麻"
      ],

    },
    {
      "id": 11,
      "category": "liangban",
      "name": "口水鸡",

      "price": 46,
      "image": "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=400&fit=crop",
      "description": "鸡肉嫩滑，红油飘香，集麻辣鲜香于一身",

      "ingredients": [
        "三黄鸡",
        "花生碎",
        "芝麻酱",
        "辣椒油",
        "花椒粉",
        "香醋"
      ],

      "steps": [
        "整鸡冷水下锅，加葱姜料酒煮熟",
        "捞出立即放入冰水中冷却，保持皮脆肉嫩",
        "鸡肉斩件摆盘",
        "红油中加入芝麻酱、花椒粉、糖、醋调成酱汁",
        "淋在鸡肉上，撒花生碎、葱花、香菜"
      ],

    },
    {
      "id": 12,
      "category": "liangban",
      "name": "老醋花生",

      "price": 18,
      "image": "https://images.unsplash.com/photo-1600189020840-e9918c25268d?w=400&h=400&fit=crop",
      "description": "花生酥脆，陈醋醇厚，酸甜开胃",

      "ingredients": [
        "花生米",
        "山西老陈醋",
        "白糖",
        "生抽",
        "洋葱",
        "香菜"
      ],

      "steps": [
        "花生米冷油下锅，小火慢炸至酥脆",
        "捞出沥油，趁热撒少许白酒保持酥脆",
        "洋葱切丁，香菜切段",
        "老陈醋加糖、生抽小火熬成浓稠酸甜汁",
        "花生冷却后与洋葱、香菜拌匀，浇上醋汁"
      ],

    },
    {
      "id": 13,
      "category": "zhushi",
      "name": "扬州炒饭",

      "price": 32,
      "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=400&fit=crop",
      "description": "粒粒分明，色彩缤纷，配料丰富",

      "ingredients": [
        "米饭",
        "火腿丁",
        "虾仁",
        "鸡蛋",
        "豌豆",
        "胡萝卜丁"
      ],

      "steps": [
        "米饭提前煮好，摊凉后冰箱冷藏2小时",
        "鸡蛋打散炒熟盛出",
        "虾仁焯水，火腿、胡萝卜切丁",
        "热油下配料翻炒，倒入米饭用铲子打散",
        "加盐、白胡椒粉调味，撒葱花翻炒均匀"
      ],

    },
    {
      "id": 14,
      "category": "zhushi",
      "name": "葱油拌面",

      "price": 18,
      "image": "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=400&fit=crop",
      "description": "葱香浓郁，面条劲道，简单却不平凡",

      "ingredients": [
        "细面",
        "小葱",
        "生抽",
        "老抽",
        "白糖",
        "食用油"
      ],

      "steps": [
        "小葱切段，葱白和葱绿分开",
        "冷油下葱白，小火慢炸至微黄",
        "加入葱绿继续炸至焦香酥脆捞出",
        "锅中留葱油，加入生抽、老抽、白糖熬成酱汁",
        "面条煮熟捞出，淋上葱油和酱汁，撒葱酥拌匀"
      ],

    },
    {
      "id": 15,
      "category": "zhushi",
      "name": "鲜肉小笼包",

      "price": 28,
      "image": "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=400&fit=crop",
      "description": "皮薄汁多，肉馅鲜美，一口爆汁",

      "ingredients": [
        "中筋面粉",
        "猪肉馅",
        "肉皮冻",
        "姜末",
        "生抽",
        "香油"
      ],

      "steps": [
        "肉皮冻切小丁，与肉馅、调料搅匀冷藏",
        "面粉加水揉成光滑面团，醒面30分钟",
        "面团搓条下剂，擀成中间厚边缘薄的皮",
        "包入馅料，捏出18个以上的褶子",
        "水开上锅蒸8分钟，趁热蘸姜醋汁食用"
      ],

    },
    {
      "id": 16,
      "category": "yinpin",
      "name": "桂花酸梅汤",

      "price": 16,
      "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=400&fit=crop",
      "description": "酸甜解暑，桂香幽幽，夏日必备",

      "ingredients": [
        "乌梅",
        "山楂",
        "甘草",
        "陈皮",
        "桂花",
        "冰糖"
      ],

      "steps": [
        "乌梅、山楂、甘草、陈皮洗净浸泡30分钟",
        "加足量清水大火煮开，转小火煮40分钟",
        "加入冰糖搅拌至融化",
        "关火后撒干桂花，盖盖焖10分钟",
        "过滤后冷藏2小时，加冰块饮用"
      ],

    },
    {
      "id": 17,
      "category": "yinpin",
      "name": "鲜榨西瓜汁",

      "price": 22,
      "image": "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=400&h=400&fit=crop",
      "description": "鲜红欲滴，清甜解渴，原汁原味",

      "ingredients": [
        "麒麟西瓜",
        "薄荷叶",
        "冰块",
        "少许盐"
      ],

      "steps": [
        "西瓜去皮去籽，切小块",
        "放入榨汁机，加少许盐更能激发甜味",
        "榨成细腻果汁",
        "杯中加满冰块，倒入西瓜汁",
        "点缀薄荷叶，立即饮用"
      ],

    },
    {
      "id": 18,
      "category": "yinpin",
      "name": "红枣枸杞茶",

      "price": 12,
      "image": "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=400&h=400&fit=crop",
      "description": "温润甘甜，补气养血，养生首选",

      "ingredients": [
        "红枣",
        "枸杞",
        "桂圆干",
        "冰糖",
        "清水"
      ],

      "steps": [
        "红枣洗净去核，桂圆干去壳",
        "锅中加水，放入红枣、桂圆大火烧开",
        "转小火煮15分钟",
        "加入枸杞和冰糖，再煮5分钟",
        "倒入茶壶，趁热慢慢品饮"
      ],

    }
]