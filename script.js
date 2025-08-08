const synth = window.speechSynthesis;
let currentMessage = [];
let selectedLanguage = 'ar-SA'; // Default language set to Arabic
let isShiftActive = false;
let isKeyboardVisible = false;

// Base translations and button data
const baseTranslations = {
    'en-US': {
        speak: 'Speak',
        clear: 'Clear',
        basic: 'Basic',
        food: 'Food',
        activities: 'Activities',
        people: 'People',
        feelings: 'Feelings',
        help: 'Help', // New category
        footer: 'An AAC communication tool for non-speaking children',
        buttons: {
            basic: {
                categoryName: 'Basic',
                elements: [
                    { text: "Yes", emoji: "👍", imageUrl: "" },
                    { text: "No", emoji: "👎", imageUrl: "" },
                    { text: "Help", emoji: "🆘", imageUrl: "" },
                    { text: "More", emoji: "➕", imageUrl: "" },
                    { text: "All done", emoji: "✅", imageUrl: "" },
                    { text: "Thank you", emoji: "🙏", imageUrl: "" },
                    { text: "Please", emoji: "🤲", imageUrl: "" },
                    { text: "Sorry", emoji: "😔", imageUrl: "" },
                    { text: "Hello", emoji: "👋", imageUrl: "" },
                    { text: "Goodbye", emoji: "👋", imageUrl: "" },
                    { text: "Good morning", emoji: "☀️", imageUrl: "" },
                    { text: "Good night", emoji: "🌙", imageUrl: "" },
                    { text: "I", emoji: "👤", imageUrl: "" },
                    { text: "You", emoji: "👉", imageUrl: "" },
                    { text: "He", emoji: "👨", imageUrl: "" },
                    { text: "She", emoji: "👩", imageUrl: "" },
                    { text: "It", emoji: "📦", imageUrl: "" },
                    { text: "We", emoji: "👥", imageUrl: "" },
                    { text: "They", emoji: "👫", imageUrl: "" },
                    { text: "am", emoji: "➡️", imageUrl: "" },
                    { text: "is", emoji: "➡️", imageUrl: "" },
                    { text: "are", emoji: "➡️", imageUrl: "" },
                    { text: "want", emoji: "💖", imageUrl: "" },
                    { text: "like", emoji: "😊", imageUrl: "" },
                    { text: "feel", emoji: "🖐️", imageUrl: "" },
                    { text: "go", emoji: "🚶", imageUrl: "" },
                    { text: "do", emoji: "✅", imageUrl: "" },
                    { text: "What", emoji: "❓", imageUrl: "" },
                    { text: "Where", emoji: "📍", imageUrl: "" },
                    { text: "When", emoji: "⏰", imageUrl: "" },
                    { text: "Who", emoji: "🧑", imageUrl: "" },
                    { text: "Why", emoji: "🤔", imageUrl: "" },
                    { text: "How", emoji: "🤷‍♀️", imageUrl: "" },
                    { text: "to", emoji: "➡️", imageUrl: "" },
                    { text: "a", emoji: "🅰️", imageUrl: "" },
                    { text: "the", emoji: "📖", imageUrl: "" },
                    { text: "very", emoji: "⬆️", imageUrl: "" },
                    { text: "not", emoji: "🚫", imageUrl: "" },
                    { text: "big", emoji: "⬆️", imageUrl: "" },
                    { text: "small", emoji: "⬇️", imageUrl: "" },
                    { text: "hot", emoji: "🔥", imageUrl: "" },
                    { text: "cold", emoji: "🥶", imageUrl: "" },
                    { text: "new", emoji: "✨", imageUrl: "" },
                    { text: "old", emoji: "👴", imageUrl: "" },
                ]
            },
            food: {
                categoryName: 'Food',
                elements: [
                    { text: "Water", emoji: "💧", imageUrl: "" },
                    { text: "Milk", emoji: "🥛", imageUrl: "" },
                    { text: "Juice", emoji: "🍊", imageUrl: "" },
                    { text: "Apple", emoji: "🍎", imageUrl: "" },
                    { text: "Banana", emoji: "🍌", imageUrl: "" },
                    { text: "Bread", emoji: "🍞", imageUrl: "" },
                    { text: "Cereal", emoji: "🥣", imageUrl: "" },
                    { text: "Sandwich", emoji: "🥪", imageUrl: "" },
                    { text: "Pizza", emoji: "🍕", imageUrl: "" },
                    { text: "Chicken", emoji: "🍗", imageUrl: "" },
                    { text: "Fish", emoji: "🐟", imageUrl: "" },
                    { text: "Rice", emoji: "🍚", imageUrl: "" },
                    { text: "Pasta", emoji: "🍝", imageUrl: "" },
                    { text: "Soup", emoji: "🍲", imageUrl: "" },
                    { text: "Salad", emoji: "🥗", imageUrl: "" },
                    { text: "Cookie", emoji: "🍪", imageUrl: "" },
                    { text: "Cake", emoji: "🎂", imageUrl: "" },
                    { text: "Ice cream", emoji: "🍦", imageUrl: "" },
                    { text: "Candy", emoji: "🍬", imageUrl: "" },
                    { text: "Fruit", emoji: "🍓", imageUrl: "" },
                    { text: "Vegetables", emoji: "🥕", imageUrl: "" },
                    { text: "Breakfast", emoji: "🍳", imageUrl: "" },
                    { text: "Lunch", emoji: "🍔", imageUrl: "" },
                    { text: "Dinner", emoji: "🍽️", imageUrl: "" },
                    { text: "Snack", emoji: "🥨", imageUrl: "" },
                    { text: "Meat", emoji: "🥩", imageUrl: "" },
                    { text: "Cheese", emoji: "🧀", imageUrl: "" },
                    { text: "Egg", emoji: "🥚", imageUrl: "" },
                    { text: "Yogurt", emoji: "🍦", imageUrl: "" },
                    { text: "Coffee", emoji: "☕", imageUrl: "" },
                    { text: "Tea", emoji: "🍵", imageUrl: "" },
                ]
            },
            activities: {
                categoryName: 'Activities',
                elements: [
                    { text: "Read", emoji: "📚", imageUrl: "" },
                    { text: "Draw", emoji: "🖍️", imageUrl: "" },
                    { text: "Music", emoji: "🎶", imageUrl: "" },
                    { text: "TV", emoji: "📺", imageUrl: "" },
                    { text: "Game", emoji: "🎮", imageUrl: "" },
                    { text: "Outdoor", emoji: "🌳", imageUrl: "" },
                    { text: "Nap", emoji: "😴", imageUrl: "" },
                    { text: "Bath", emoji: "🛁", imageUrl: "" },
                    { text: "Play", emoji: "🤸", imageUrl: "" },
                    { text: "Sing", emoji: "🎤", imageUrl: "" },
                    { text: "Dance", emoji: "💃", imageUrl: "" },
                    { text: "Walk", emoji: "🚶‍♀️", imageUrl: "" },
                    { text: "Run", emoji: "🏃", imageUrl: "" },
                    { text: "Jump", emoji: "🤸‍♂️", imageUrl: "" },
                    { text: "School", emoji: "🏫", imageUrl: "" },
                    { text: "Park", emoji: "🏞️", imageUrl: "" },
                    { text: "Store", emoji: "🏪", imageUrl: "" },
                    { text: "Zoo", emoji: "🦁", imageUrl: "" },
                    { text: "Beach", emoji: "🏖️", imageUrl: "" },
                    { text: "Clean up", emoji: "🧹", imageUrl: "" },
                    { text: "Help out", emoji: "🤝", imageUrl: "" },
                    { text: "Color", emoji: "🎨", imageUrl: "" },
                    { text: "Build", emoji: "🧱", imageUrl: "" },
                    { text: "Puzzle", emoji: "🧩", imageUrl: "" },
                    { text: "Tablet", emoji: "📱", imageUrl: "" },
                    { text: "Computer", emoji: "💻", imageUrl: "" },
                    { text: "Bike", emoji: "🚲", imageUrl: "" },
                    { text: "Car ride", emoji: "🚗", imageUrl: "" },
                    { text: "Bus ride", emoji: "🚌", imageUrl: "" },
                    { text: "Train ride", emoji: "🚆", imageUrl: "" },
                ]
            },
            people: {
                categoryName: 'People',
                elements: [
                    { text: "Mom", emoji: "👩‍👧", imageUrl: "" },
                    { text: "Dad", emoji: "👨‍👦", imageUrl: "" },
                    { text: "Teacher", emoji: "🧑‍🏫", imageUrl: "" },
                    { text: "Friend", emoji: "🤝", imageUrl: "" },
                    { text: "Doctor", emoji: "🩺", imageUrl: "" },
                    { text: "Sibling", emoji: "👫", imageUrl: "" },
                    { text: "Grandma", emoji: "👵", imageUrl: "" },
                    { text: "Grandpa", emoji: "👴", imageUrl: "" },
                    { text: "Aunt", emoji: "👩‍🦰", imageUrl: "" },
                    { text: "Uncle", emoji: "👨‍🦱", imageUrl: "" },
                    { text: "Nurse", emoji: "👩‍⚕️", imageUrl: "" },
                    { text: "Therapist", emoji: "🧑‍⚕️", imageUrl: "" },
                    { text: "Babysitter", emoji: "👶", imageUrl: "" },
                    { text: "Neighbor", emoji: "🏡", imageUrl: "" },
                    { text: "Boy", emoji: "👦", imageUrl: "" },
                    { text: "Girl", emoji: "👧", imageUrl: "" },
                    { text: "Man", emoji: "👨", imageUrl: "" },
                    { text: "Woman", emoji: "👩", imageUrl: "" },
                    { text: "Baby", emoji: "👶", imageUrl: "" },
                    { text: "Child", emoji: "🧒", imageUrl: "" },
                    { text: "Adult", emoji: "🧑", imageUrl: "" },
                    { text: "Family", emoji: "👨‍👩‍👧‍👦", imageUrl: "" },
                    { text: "Stranger", emoji: "👤", imageUrl: "" },
                    { text: "Police Officer", emoji: "👮‍♂️", imageUrl: "" },
                    { text: "Firefighter", emoji: "👨‍🚒", imageUrl: "" },
                ]
            },
            feelings: {
                categoryName: 'Feelings',
                elements: [
                    { text: "Happy", emoji: "😊", imageUrl: "" },
                    { text: "Sad", emoji: "😢", imageUrl: "" },
                    { text: "Angry", "emoji": "😡", imageUrl: "" },
                    { text: "Tired", emoji: "😩", imageUrl: "" },
                    { text: "Hungry", emoji: "😋", imageUrl: "" },
                    { text: "Hurt", emoji: "🤕", imageUrl: "" },
                    { text: "Scared", emoji: "😨", imageUrl: "" },
                    { text: "Love", emoji: "❤️", imageUrl: "" },
                    { text: "Excited", emoji: "🤩", imageUrl: "" },
                    { text: "Bored", emoji: "😑", imageUrl: "" },
                    { text: "Confused", emoji: "😕", imageUrl: "" },
                    { text: "Proud", emoji: "😌", imageUrl: "" },
                    { text: "Shy", emoji: "🫣", imageUrl: "" },
                    { text: "Surprised", emoji: "😲", imageUrl: "" },
                    { text: "Frustrated", emoji: "😤", imageUrl: "" },
                    { text: "Calm", emoji: "😌", imageUrl: "" },
                    { text: "Worried", emoji: "😟", imageUrl: "" },
                    { text: "Lonely", emoji: "😔", imageUrl: "" },
                    { text: "Annoyed", emoji: "😒", imageUrl: "" },
                    { text: "Grateful", emoji: "🙏", imageUrl: "" },
                    { text: "Hopeful", emoji: "✨", imageUrl: "" },
                    { text: "Jealous", emoji: "😠", imageUrl: "" },
                    { text: "Silly", emoji: "🤪", imageUrl: "" },
                    { text: "Sleepy", emoji: "😴", imageUrl: "" },
                    { text: "Stressed", emoji: "😫", imageUrl: "" },
                    { text: "Thankful", emoji: "😊", imageUrl: "" },
                ]
            },
            help: { // New 'Help' category
                categoryName: 'Help',
                elements: [
                    { text: "Emergency", emoji: "🚨", imageUrl: "" },
                    { text: "I am Hurt", emoji: "🤕", imageUrl: "" },
                    { text: "Tired", emoji: "😴", imageUrl: "" },
                    { text: "Medicine", emoji: "💊", imageUrl: "" },
                    { text: "Bandage", emoji: "🩹", imageUrl: "" },
                    { text: "Toilet", emoji: "🚽", imageUrl: "" },
                    { text: "Danger", emoji: "⚠️", imageUrl: "" },
                    { text: "Thirsty", emoji: "💧", imageUrl: "" },
                    { text: "Sick", emoji: "🤢", imageUrl: "" },
                    { text: "Cold", emoji: "🥶", imageUrl: "" },
                    { text: "Hot", emoji: "🥵", imageUrl: "" },
                    { text: "Lost", emoji: "🗺️", imageUrl: "" },
                    { text: "Need help", emoji: "🙏", imageUrl: "" },
                    { text: "Call someone", emoji: "📞", imageUrl: "" },
                    { text: "Doctor", emoji: "👨‍⚕️", imageUrl: "" },
                    { text: "Nurse", emoji: "👩‍⚕️", imageUrl: "" },
                    { text: "Police", emoji: "🚓", imageUrl: "" },
                    { text: "Fire", emoji: "🚒", imageUrl: "" },
                    { text: "Ambulance", emoji: "🚑", imageUrl: "" },
                    { text: "Pain", emoji: "😖", imageUrl: "" },
                    { text: "Headache", emoji: "🤯", imageUrl: "" },
                    { text: "Stomach ache", emoji: "🤢", imageUrl: "" },
                    { text: "Fever", emoji: "🤒", imageUrl: "" },
                    { text: "Dizzy", emoji: "💫", imageUrl: "" },
                    { text: "Scared", emoji: "😨", imageUrl: "" },
                    { text: "Broken", emoji: "💔", imageUrl: "" },
                    { text: "Fix it", emoji: "🔧", imageUrl: "" },
                    { text: "Quiet", emoji: "🤫", imageUrl: "" },
                    { text: "Loud", emoji: "🔊", imageUrl: "" },
                    { text: "Light", emoji: "💡", imageUrl: "" },
                    { text: "Dark", emoji: "⚫", imageUrl: "" },
                    { text: "Clean", emoji: "🧼", imageUrl: "" },
                    { text: "Dirty", emoji: " 🤮", imageUrl: "" },
                    { text: "Wet", emoji: "💧", imageUrl: "" },
                    { text: "Dry", emoji: "☀️", imageUrl: "" },
                ]
            }
        }
    },
    'ar-SA': {
        speak: 'تكلم',
        clear: 'مسح',
        basic: 'أساسي',
        food: 'طعام',
        activities: 'أنشطة',
        people: 'أشخاص',
        feelings: 'مشاعر',
        help: 'مساعدة', // New category
        footer: 'أداة تواصل AAC للأطفال غير الناطقين',
        buttons: {
            basic: {
                categoryName: 'أساسي',
                elements: [
                    { text: "نعم", emoji: "👍", imageUrl: "" },
                    { text: "لا", emoji: "👎", imageUrl: "" },
                    { text: "مساعدة", emoji: "🆘", imageUrl: "" },
                    { text: "المزيد", emoji: "➕", imageUrl: "" },
                    { text: "انتهيت", emoji: "✅", imageUrl: "" },
                    { text: "شكرا لك", emoji: "🙏", imageUrl: "" },
                    { text: "من فضلك", emoji: "🤲", imageUrl: "" },
                    { text: "آسف", emoji: "😔", imageUrl: "" },
                    { text: "مرحبا", emoji: "👋", imageUrl: "" },
                    { text: "مع السلامة", emoji: "👋", imageUrl: "" },
                    { text: "صباح الخير", emoji: "☀️", imageUrl: "" },
                    { text: "تصبح على خير", emoji: "🌙", imageUrl: "" },
                    { text: "أنا", emoji: "👤", imageUrl: "" },
                    { text: "أنت", emoji: "👉", imageUrl: "" },
                    { text: "هو", emoji: "👨", imageUrl: "" },
                    { text: "هي", emoji: "👩", imageUrl: "" },
                    { text: "هو/هي (لغير العاقل)", emoji: "📦", imageUrl: "" },
                    { text: "نحن", emoji: "👥", imageUrl: "" },
                    { text: "هم", emoji: "👫", imageUrl: "" },
                    { text: "أكون", emoji: "➡️", imageUrl: "" },
                    { text: "يكون", emoji: "➡️", imageUrl: "" },
                    { text: "يكونون", emoji: "➡️", imageUrl: "" },
                    { text: "أريد", emoji: "💖", imageUrl: "" },
                    { text: "أحب", emoji: "😊", imageUrl: "" },
                    { text: "أشعر", emoji: "🖐️", imageUrl: "" },
                    { text: "أذهب", emoji: "🚶", imageUrl: "" },
                    { text: "أفعل", emoji: "✅", imageUrl: "" },
                    { text: "ماذا", emoji: "❓", imageUrl: "" },
                    { text: "أين", emoji: "📍", imageUrl: "" },
                    { text: "متى", emoji: "⏰", imageUrl: "" },
                    { text: "من", emoji: "🧑", imageUrl: "" },
                    { text: "لماذا", emoji: "🤔", imageUrl: "" },
                    { text: "كيف", emoji: "🤷‍♀️", imageUrl: "" },
                    { text: "إلى", emoji: "➡️", imageUrl: "" },
                    { text: "أداة تعريف", emoji: "🅰️", imageUrl: "" },
                    { text: "الـ", emoji: "📖", imageUrl: "" },
                    { text: "جدا", emoji: "⬆️", imageUrl: "" },
                    { text: "لا", emoji: "🚫", imageUrl: "" },
                    { text: "كبير", emoji: "⬆️", imageUrl: "" },
                    { text: "صغير", emoji: "⬇️", imageUrl: "" },
                    { text: "حار", emoji: "🔥", imageUrl: "" },
                    { text: "بارد", emoji: "🥶", imageUrl: "" },
                    { text: "جديد", emoji: "✨", imageUrl: "" },
                    { text: "قديم", emoji: "👴", imageUrl: "" },
                ]
            },
            food: {
                categoryName: 'طعام',
                elements: [
                    { text: "ماء", emoji: "💧", imageUrl: "" },
                    { text: "حليب", emoji: "🥛", imageUrl: "" },
                    { text: "عصير", emoji: "🍊", imageUrl: "" },
                    { text: "تفاح", emoji: "🍎", imageUrl: "" },
                    { text: "موز", emoji: "🍌", imageUrl: "" },
                    { text: "خبز", emoji: "🍞", imageUrl: "" },
                    { text: "حبوب", emoji: "🥣", imageUrl: "" },
                    { text: "ساندويتش", emoji: "🥪", imageUrl: "" },
                    { text: "بيتزا", emoji: "🍕", imageUrl: "" },
                    { text: "دجاج", emoji: "🍗", imageUrl: "" },
                    { text: "سمك", emoji: "🐟", imageUrl: "" },
                    { text: "أرز", emoji: "🍚", imageUrl: "" },
                    { text: "معكرونة", emoji: "🍝", imageUrl: "" },
                    { text: "شوربة", emoji: "🍲", imageUrl: "" },
                    { text: "سلطة", emoji: "🥗", imageUrl: "" },
                    { text: "كعكة", emoji: "🍪", imageUrl: "" },
                    { text: "كيك", emoji: "🎂", imageUrl: "" },
                    { text: "آيس كريم", emoji: "🍦", imageUrl: "" },
                    { text: "حلوى", emoji: "🍬", imageUrl: "" },
                    { text: "فاكهة", emoji: "🍓", imageUrl: "" },
                    { text: "خضروات", emoji: "🥕", imageUrl: "" },
                    { text: "فطور", emoji: "🍳", imageUrl: "" },
                    { text: "غداء", emoji: "🍔", imageUrl: "" },
                    { text: "عشاء", emoji: "🍽️", imageUrl: "" },
                    { text: "وجبة خفيفة", emoji: "🥨", imageUrl: "" },
                    { text: "لحم", emoji: "🥩", imageUrl: "" },
                    { text: "جبن", emoji: "🧀", imageUrl: "" },
                    { text: "بيضة", emoji: "🥚", imageUrl: "" },
                    { text: "زبادي", emoji: "🍦", imageUrl: "" },
                    { text: "قهوة", emoji: "☕", imageUrl: "" },
                    { text: "شاي", emoji: "🍵", imageUrl: "" },
                ]
            },
            activities: {
                categoryName: 'أنشطة',
                elements: [
                    { text: "قراءة", emoji: "📚", imageUrl: "" },
                    { text: "رسم", emoji: "🖍️", imageUrl: "" },
                    { text: "موسيقى", emoji: "🎶", imageUrl: "" },
                    { text: "تلفاز", emoji: "📺", imageUrl: "" },
                    { text: "لعبة", emoji: "🎮", imageUrl: "" },
                    { text: "خارج المنزل", emoji: "🌳", imageUrl: "" },
                    { text: "قيلولة", emoji: "😴", imageUrl: "" },
                    { text: "استحمام", emoji: "🛁", imageUrl: "" },
                    { text: "لعب", emoji: "🤸", imageUrl: "" },
                    { text: "غناء", emoji: "🎤", imageUrl: "" },
                    { text: "رقص", emoji: "💃", imageUrl: "" },
                    { text: "مشي", emoji: "🚶‍♀️", imageUrl: "" },
                    { text: "جري", emoji: "🏃", imageUrl: "" },
                    { text: "قفز", emoji: "🤸‍♂️", imageUrl: "" },
                    { text: "مدرسة", emoji: "🏫", imageUrl: "" },
                    { text: "حديقة", emoji: "🏞️", imageUrl: "" },
                    { text: "متجر", emoji: "🏪", imageUrl: "" },
                    { text: "حديقة حيوان", emoji: "🦁", imageUrl: "" },
                    { text: "شاطئ", emoji: "🏖️", imageUrl: "" },
                    { text: "تنظيف", emoji: "🧹", imageUrl: "" },
                    { text: "مساعدة", emoji: "🤝", imageUrl: "" },
                    { text: "تلوين", emoji: "🎨", imageUrl: "" },
                    { text: "بناء", emoji: "🧱", imageUrl: "" },
                    { text: "لغز", emoji: "🧩", imageUrl: "" },
                    { text: "جهاز لوحي", emoji: "📱", imageUrl: "" },
                    { text: "كمبيوتر", emoji: "💻", imageUrl: "" },
                    { text: "دراجة", emoji: "🚲", imageUrl: "" },
                    { text: "ركوب السيارة", emoji: "🚗", imageUrl: "" },
                    { text: "ركوب الحافلة", emoji: "🚌", imageUrl: "" },
                    { text: "ركوب القطار", emoji: "🚆", imageUrl: "" },
                ]
            },
            people: {
                categoryName: 'أشخاص',
                elements: [
                    { text: "أمي", emoji: "👩‍👧", imageUrl: "" },
                    { text: "أبي", emoji: "👨‍👦", imageUrl: "" },
                    { text: "معلم", emoji: "🧑‍🏫", imageUrl: "" },
                    { text: "صديق", emoji: "🤝", imageUrl: "" },
                    { text: "طبيب", emoji: "🩺", imageUrl: "" },
                    { text: "أخ/أخت", emoji: "👫", imageUrl: "" },
                    { text: "جدة", emoji: "👵", imageUrl: "" },
                    { text: "جد", emoji: "👴", imageUrl: "" },
                    { text: "عمة/خالة", emoji: "👩‍🦰", imageUrl: "" },
                    { text: "عم/خال", emoji: "👨‍🦱", imageUrl: "" },
                    { text: "ممرضة", emoji: "👩‍⚕️", imageUrl: "" },
                    { text: "معالج", emoji: "🧑‍⚕️", imageUrl: "" },
                    { text: "جليسة أطفال", emoji: "👶", imageUrl: "" },
                    { text: "جار", emoji: "🏡", imageUrl: "" },
                    { text: "ولد", emoji: "👦", imageUrl: "" },
                    { text: "بنت", emoji: "👧", imageUrl: "" },
                    { text: "رجل", emoji: "👨", imageUrl: "" },
                    { text: "امرأة", emoji: "👩", imageUrl: "" },
                    { text: "طفل رضيع", emoji: "👶", imageUrl: "" },
                    { text: "طفل", emoji: "🧒", imageUrl: "" },
                    { text: "بالغ", emoji: "🧑", imageUrl: "" },
                    { text: "عائلة", emoji: "👨‍👩‍👧‍👦", imageUrl: "" },
                    { text: "غريب", emoji: "👤", imageUrl: "" },
                    { text: "ضابط شرطة", emoji: "👮‍♂️", imageUrl: "" },
                    { text: "رجل إطفاء", emoji: "👨‍🚒", imageUrl: "" },
                ]
            },
            feelings: {
                categoryName: 'مشاعر',
                elements: [
                    { text: "سعيد", emoji: "😊", imageUrl: "" },
                    { text: "حزين", emoji: "😢", imageUrl: "" },
                    { text: "غاضب", emoji: "😡", imageUrl: "" },
                    { text: "متعب", emoji: "😩", imageUrl: "" },
                    { text: "جائع", emoji: "😋", imageUrl: "" },
                    { text: "متألم", emoji: "🤕", imageUrl: "" },
                    { text: "خائف", emoji: "😨", imageUrl: "" },
                    { text: "حب", emoji: "❤️", imageUrl: "" },
                    { text: "متحمس", emoji: "🤩", imageUrl: "" },
                    { text: "ملل", emoji: "😑", imageUrl: "" },
                    { text: "مرتبك", emoji: "😕", imageUrl: "" },
                    { text: "فخور", emoji: "😌", imageUrl: "" },
                    { text: "خجول", emoji: "🫣", imageUrl: "" },
                    { text: "متفاجئ", emoji: "😲", imageUrl: "" },
                    { text: "محبط", emoji: "😤", imageUrl: "" },
                    { text: "هادئ", emoji: "😌", imageUrl: "" },
                    { text: "قلق", emoji: "😟", imageUrl: "" },
                    { text: "وحيد", emoji: "😔", imageUrl: "" },
                    { text: "منزعج", emoji: "😒", imageUrl: "" },
                    { text: "ممتن", emoji: "🙏", imageUrl: "" },
                    { text: "متفائل", emoji: "✨", imageUrl: "" },
                    { text: "غيور", emoji: "😠", imageUrl: "" },
                    { text: "أحمق", emoji: "🤪", imageUrl: "" },
                    { text: "نعسان", emoji: "😴", imageUrl: "" },
                    { text: "مجهد", emoji: "😫", imageUrl: "" },
                    { text: "شاكر", emoji: "😊", imageUrl: "" },
                ]
            },
            help: { // New 'Help' category
                categoryName: 'مساعدة',
                elements: [
                    { text: "طوارئ", emoji: "🚨", imageUrl: "" },
                    { text: "أنا مصاب", emoji: "🤕", imageUrl: "" },
                    { text: "متعب", emoji: "😴", imageUrl: "" },
                    { text: "دواء", emoji: "💊", imageUrl: "" },
                    { text: "ضمادة", emoji: "🩹", imageUrl: "" },
                    { text: "مرحاض", emoji: "🚽", imageUrl: "" },
                    { text: "خطر", emoji: "⚠️", imageUrl: "" },
                    { text: "عطشان", emoji: "💧", imageUrl: "" },
                    { text: "مريض", emoji: "🤢", imageUrl: "" },
                    { text: "بردان", emoji: "🥶", imageUrl: "" },
                    { text: "حران", emoji: "🥵", imageUrl: "" },
                    { text: "ضائع", emoji: "🗺️", imageUrl: "" },
                    { text: "أحتاج مساعدة", emoji: "🙏", imageUrl: "" },
                    { text: "اتصل بشخص", emoji: "📞", imageUrl: "" },
                    { text: "طبيب", emoji: "👨‍⚕️", imageUrl: "" },
                    { text: "ممرضة", emoji: "👩‍⚕️", imageUrl: "" },
                    { text: "شرطة", emoji: "🚓", imageUrl: "" },
                    { text: "حريق", emoji: "🚒", imageUrl: "" },
                    { text: "إسعاف", emoji: "🚑", imageUrl: "" },
                    { text: "ألم", emoji: "😖", imageUrl: "" },
                    { text: "صداع", emoji: "🤯", imageUrl: "" },
                    { text: "ألم بطن", emoji: "🤢", imageUrl: "" },
                    { text: "حمى", emoji: "🤒", imageUrl: "" },
                    { text: "دوار", emoji: "💫", imageUrl: "" },
                    { text: "خائف", emoji: "😨", imageUrl: "" },
                    { text: "مكسور", emoji: "💔", imageUrl: "" },
                    { text: "أصلحها", emoji: "🔧", imageUrl: "" },
                    { text: "هادئ", emoji: "🤫", imageUrl: "" },
                    { text: "صاخب", emoji: "🔊", imageUrl: "" },
                    { text: "ضوء", emoji: "💡", imageUrl: "" },
                    { text: "ظلام", emoji: " ⚫", imageUrl: "" },
                    { text: "نظيف", emoji: "🧼", imageUrl: "" },
                    { text: "متسخ", emoji: "🤮", imageUrl: "" },
                    { text: "مبلل", emoji: "💧", imageUrl: "" },
                    { text: "جاف", emoji: "☀️", imageUrl: "" },
                ]
            }
        }
    }
};

let translations = {}; // This will be populated from localStorage or baseTranslations

let currentButtonsData = {}; // This will be populated based on selectedLanguage

// Function to load data from localStorage or use base data
function loadData() {
    const savedTranslations = localStorage.getItem('aacTranslations');
    if (savedTranslations) {
        translations = JSON.parse(savedTranslations);
    } else {
        translations = JSON.parse(JSON.stringify(baseTranslations)); // Deep copy
    }
}

// Function to save data to localStorage
function saveData() {
    localStorage.setItem('aacTranslations', JSON.stringify(translations));
}

// Function to find a suitable kid's voice for native SpeechSynthesis
function getKidVoice(lang) {
    const voices = synth.getVoices();
    const lowerCaseLang = lang.toLowerCase();
    console.log(`Attempting to find voice for language: ${lang}`);
    console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));

    // Keywords to look for in voice names for a kid's voice
    const kidKeywords = ['child', 'kid', 'boy', 'girl', 'junior', 'young'];

    // 1. Try to find a kid's voice for the exact language code (e.g., 'ar-SA')
    let targetVoices = voices.filter(voice => voice.lang.toLowerCase() === lowerCaseLang);
    for (const keyword of kidKeywords) {
        const foundVoice = targetVoices.find(voice => voice.name.toLowerCase().includes(keyword));
        if (foundVoice) {
            console.log(`Found kid voice for exact lang (${lang}): ${foundVoice.name}`);
            return foundVoice;
        }
    }

    // 2. If no kid's voice, try to find any voice for the exact language code
    if (targetVoices.length > 0) {
        console.log(`No kid voice found for exact lang (${lang}), using first available voice for exact lang: ${targetVoices[0].name}`);
        return targetVoices[0];
    }

    // 3. If no voices for exact language code, try to find a kid's voice for the broader language (e.g., 'ar' for any Arabic dialect)
    targetVoices = voices.filter(voice => voice.lang.toLowerCase().startsWith(lowerCaseLang.substring(0, 2)));
    for (const keyword of kidKeywords) {
        const foundVoice = targetVoices.find(voice => voice.name.toLowerCase().includes(keyword));
        if (foundVoice) {
            console.log(`Found kid voice for broad lang (${lang.substring(0, 2)}): ${foundVoice.name}`);
            return foundVoice;
        }
    }

    // 4. If no kid's voice for broader language, try to find any voice for the broader language
    if (targetVoices.length > 0) {
        console.log(`No kid voice found for broad lang (${lang.substring(0, 2)}), using first available voice for broad lang: ${targetVoices[0].name}`);
        return targetVoices[0];
    }

    // 5. Fallback to the very first voice available in the system
    if (voices.length > 0) {
        console.log('No specific or broad language voices found, using default system voice:', voices[0].name);
        return voices[0];
    }

    console.log('No voices available at all in the system.');
    return null; // No voices available
}


// Update UI text based on selected language
function updateUIText() {
    const currentTranslation = translations[selectedLanguage];
    document.getElementById('speakBtnText').textContent = currentTranslation.speak;
    document.getElementById('clearBtnText').textContent = currentTranslation.clear;
    document.getElementById('footerText').textContent = currentTranslation.footer;

    // Update category button texts
    const categoryTabs = document.getElementById('categoryTabs');
    categoryTabs.innerHTML = ''; // Clear existing tabs
    let firstCategoryKey = null;

    for (const categoryKey in currentTranslation.buttons) {
        if (currentTranslation.buttons.hasOwnProperty(categoryKey)) {
            if (firstCategoryKey === null) {
                firstCategoryKey = categoryKey;
            }
            const categoryData = currentTranslation.buttons[categoryKey];
            const categoryDisplayName = categoryData.categoryName || categoryKey; // Use categoryName from object

            const btn = document.createElement('button');
            btn.onclick = () => showCategory(categoryKey);
            btn.className = `category-btn whitespace-nowrap px-4 py-2 rounded-full font-medium button`;

            // Assign a specific color for new categories, or use predefined for base ones
            let categoryColor = '';
            let textColor = 'white'; // Default text color for category buttons
            switch(categoryKey) {
                case 'basic': categoryColor = 'var(--category-basic)'; break;
                case 'food': categoryColor = 'var(--category-food)'; break;
                case 'activities': categoryColor = 'var(--category-activities)'; break;
                case 'people': categoryColor = 'var(--category-people)'; break;
                case 'feelings': categoryColor = 'var(--category-feelings)'; break;
                case 'help': categoryColor = 'var(--category-help)'; break; // New category color
                default:
                    // Generate a consistent color for custom categories based on their key
                    const hash = categoryKey.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
                    const hue = Math.abs(hash) % 360;
                    categoryColor = `hsl(${hue}, 70%, 60%)`;
                    textColor = 'white'; // Ensure custom categories have white text
            }
            btn.style.backgroundColor = categoryColor;
            btn.style.color = textColor;
            btn.innerHTML = `<span>${categoryDisplayName}</span>`;
            categoryTabs.appendChild(btn);
        }
    }
    // Re-activate the current category or the first one if none active
    const activeCategoryBtn = document.querySelector('.category-btn.active');
    if (activeCategoryBtn) {
        const currentActiveCategoryKey = activeCategoryBtn.onclick.toString().match(/'([^']+)'/)[1];
        showCategory(currentActiveCategoryKey);
    } else if (firstCategoryKey) {
        showCategory(firstCategoryKey);
    }
}

// Function to initialize the app after voices are loaded
function initializeApp() {
    if (window._lafzInitialized) return;
    window._lafzInitialized = true;
    loadData(); // Load data from localStorage
    // Set initial language based on browser or default to Arabic
    selectedLanguage = 'ar-SA'; // Set Arabic as primary language
    document.getElementById('languageSelect').value = 'ar-SA';

    currentButtonsData = translations[selectedLanguage].buttons;
    updateUIText();
    showCategory(Object.keys(currentButtonsData)[0] || 'basic'); // Show first category or basic
    updateKeyboardLayout(); // Show the correct keyboard on load

    // Add event listener for language selection
    document.getElementById('languageSelect').addEventListener('change', (event) => {
        selectedLanguage = event.target.value;
        currentButtonsData = translations[selectedLanguage].buttons;
        updateUIText();
        // Get the currently active category button and re-show its category
        const activeCategoryBtn = document.querySelector('.category-btn.active');
        if (activeCategoryBtn) {
            const currentActiveCategoryKey = activeCategoryBtn.onclick.toString().match(/'([^']+)'/)[1];
            showCategory(currentActiveCategoryKey);
        } else {
            showCategory(Object.keys(currentButtonsData)[0] || 'basic'); // Fallback to first category or basic
        }
        updateKeyboardLayout(); // Update keyboard when language changes
    });

    // Settings Modal Event Listeners
    document.getElementById('settingsBtn').addEventListener('click', openSettingsModal);
    document.getElementById('addCategoryForm').addEventListener('submit', addCategory);
    document.getElementById('addElementForm').addEventListener('submit', addElement);
    document.getElementById('removeCategoryForm').addEventListener('submit', removeCategory);
    document.getElementById('removeElementForm').addEventListener('submit', removeElement);

    // Event listener for category selection in element removal form
    document.getElementById('selectCategoryForElementRemoval').addEventListener('change', populateElementSelectForRemoval);

    // Keyboard Event Listener
    document.getElementById('keyboardToggleBtn').addEventListener('click', toggleKeyboard);
    // Attach event listeners to all keyboard keys
    document.querySelectorAll('.keyboard-key').forEach(key => {
        key.addEventListener('click', handleKeyboardInput);
    });
}

// Listen for voiceschanged event to ensure voices are loaded
// Robust init for WebViews and browsers
if (typeof window._lafzInitialized === 'undefined') {
    window._lafzInitialized = false;
}
function safeInit() {
    if (window._lafzInitialized) return;
    try {
        initializeApp();
        window._lafzInitialized = true;
    } catch (err) {
        console.error('initializeApp() failed:', err);
    }
}
// Always init immediately so UI builds even if voiceschanged never fires
safeInit();
// Still listen for voiceschanged to update voices later
if (typeof window.speechSynthesis !== 'undefined' && 'onvoiceschanged' in window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = function () {
        console.log('speechSynthesis.onvoiceschanged fired — voices available');
    };
}


// Show buttons for selected category
function showCategory(category) {
    // Update active tab
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const targetBtn = document.querySelector(`button[onclick="showCategory('${category}')"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }

    // Load buttons for the category
    const grid = document.getElementById('buttonsGrid');
    grid.innerHTML = '';

    const categoryData = currentButtonsData[category]; // Get the category object
    if (categoryData && categoryData.elements) { // Check if elements array exists
        categoryData.elements.forEach(button => {
            const btn = document.createElement('div');
            btn.className = 'bg-white rounded-xl shadow-md p-3 flex flex-col items-center justify-center button cursor-pointer communication-button';
            btn.onclick = () => addToMessage(button.text); // Add plain text to message

            // Create emoji container or image
            const visualContainer = document.createElement('div');
            visualContainer.className = 'emoji-container'; // Apply styling for centering emoji

            if (button.emoji) {
                visualContainer.textContent = button.emoji; // Display emoji directly
            } else if (button.imageUrl) {
                const img = document.createElement('img');
                img.src = button.imageUrl;
                img.alt = button.text;
                img.className = 'h-full w-full object-contain'; // Make image fill container
                visualContainer.appendChild(img);
            } else {
                visualContainer.textContent = '❓'; // Fallback if no emoji or image
            }

            // Button text (plain text)
            const text = document.createElement('span');
            text.className = 'text-sm font-medium text-center mt-1'; /* Added margin-top */
            text.textContent = button.text;

            btn.appendChild(visualContainer);
            btn.appendChild(text);
            grid.appendChild(btn);
        });
    }
}

// Add word to message
function addToMessage(word) {
    currentMessage.push(word);
    updateMessageArea();
}

// Update the message area display
function updateMessageArea() {
    const messageArea = document.getElementById('messageArea');
    messageArea.innerHTML = '';

    currentMessage.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'message-word'; // Use new class for styling
        wordSpan.textContent = word;

        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&times;';
        deleteBtn.className = 'delete-btn'; // Use new class for styling
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            currentMessage.splice(index, 1);
            updateMessageArea();
        };

        wordSpan.appendChild(deleteBtn);
        messageArea.appendChild(wordSpan);
    });
}

// Speak the current message
function speakMessage() {
    if (currentMessage.length === 0) return;

    const messageToSpeak = currentMessage.join(' ');
    const speakBtn = document.getElementById('speakBtn');

    speakBtn.classList.add('speaking'); // Start speaking animation

    if (selectedLanguage === 'ar-SA') {
        // Use Google Translate TTS for Arabic
        const audio = new Audio();
        audio.src = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(messageToSpeak)}&tl=ar&client=tw-ob`;
        audio.playbackRate = 0.9; // Slightly slower for clarity
        audio.play().catch(e => {
            console.error('Error playing Arabic audio:', e);
            alert('Could not play Arabic audio. Please check your internet connection or browser settings.');
            speakBtn.classList.remove('speaking');
        });
        audio.onended = () => {
            speakBtn.classList.remove('speaking');
        };
        audio.onerror = () => {
            speakBtn.classList.remove('speaking');
        };

    } else {
        // Use native SpeechSynthesis for other languages (e.g., English)
        const utterance = new SpeechSynthesisUtterance(messageToSpeak);
        utterance.lang = selectedLanguage;
        utterance.voice = getKidVoice(selectedLanguage);

        utterance.onend = function() {
            speakBtn.classList.remove('speaking');
        };

        utterance.onerror = function(event) {
            console.error('SpeechSynthesisUtterance.onerror', event);
            speakBtn.classList.remove('speaking');
            alert('Speech synthesis error: ' + event.error + '. Please ensure your browser supports speech synthesis and has voices installed for ' + selectedLanguage + '.');
        };

        synth.speak(utterance);
    }
}

// Clear the current message
function clearMessage() {
    currentMessage = [];
    updateMessageArea();
    const clearBtn = document.getElementById('clearBtn');
    clearBtn.classList.add('clear-button-shake');
    clearBtn.addEventListener('animationend', () => {
        clearBtn.classList.remove('clear-button-shake');
    }, { once: true });
}

// Settings Modal Functions
const settingsModal = document.getElementById('settingsModal');

function openSettingsModal() {
    settingsModal.style.display = 'flex';
    populateCategorySelect(); // For adding elements
    populateCategorySelectForRemoval(); // For removing categories
    populateCategorySelectForElementRemoval(); // For removing elements
}

function closeSettingsModal() {
    settingsModal.style.display = 'none';
}

// Populates category select dropdown for adding new elements
function populateCategorySelect() {
    const select = document.getElementById('selectCategoryForElement');
    select.innerHTML = '<option value="">Select Category</option>'; // Clear and add default
    const currentTranslation = translations[selectedLanguage];
    for (const categoryKey in currentTranslation.buttons) {
        if (currentTranslation.buttons.hasOwnProperty(categoryKey)) {
            const categoryData = currentTranslation.buttons[categoryKey];
            const option = document.createElement('option');
            option.value = categoryKey;
            option.textContent = categoryData.categoryName || categoryKey;
            select.appendChild(option);
        }
    }
}

// Populates category select dropdown for removing categories
function populateCategorySelectForRemoval() {
    const select = document.getElementById('selectCategoryToRemove');
    select.innerHTML = '<option value="">Select Category to Remove</option>'; // Clear and add default
    const currentTranslation = translations[selectedLanguage];
    for (const categoryKey in currentTranslation.buttons) {
        if (currentTranslation.buttons.hasOwnProperty(categoryKey)) {
            const categoryData = currentTranslation.buttons[categoryKey];
            const option = document.createElement('option');
            option.value = categoryKey;
            option.textContent = categoryData.categoryName || categoryKey;
            select.appendChild(option);
        }
    }
}

// Populates category select dropdown for removing elements
function populateCategorySelectForElementRemoval() {
    const select = document.getElementById('selectCategoryForElementRemoval');
    select.innerHTML = '<option value="">Select Category</option>'; // Clear and add default
    const currentTranslation = translations[selectedLanguage];
    for (const categoryKey in currentTranslation.buttons) {
        if (currentTranslation.buttons.hasOwnProperty(categoryKey)) {
            const categoryData = currentTranslation.buttons[categoryKey];
            const option = document.createElement('option');
            option.value = categoryKey;
            option.textContent = categoryData.categoryName || categoryKey;
            select.appendChild(option);
        }
    }
    // Also clear the element select when category select is populated
    document.getElementById('selectElementToRemove').innerHTML = '<option value="">Select Element to Remove</option>';
}

// Populates element select dropdown based on chosen category for removal
function populateElementSelectForRemoval() {
    const categoryKey = document.getElementById('selectCategoryForElementRemoval').value;
    const selectElement = document.getElementById('selectElementToRemove');
    selectElement.innerHTML = '<option value="">Select Element to Remove</option>'; // Clear and add default

    if (categoryKey) {
        const currentTranslation = translations[selectedLanguage];
        const categoryData = currentTranslation.buttons[categoryKey];
        if (categoryData && categoryData.elements) {
            categoryData.elements.forEach((element, index) => {
                const option = document.createElement('option');
                option.value = index; // Use index as value for easy removal
                option.textContent = element.text;
                selectElement.appendChild(option);
            });
        }
    }
}


function addCategory(event) {
    event.preventDefault();
    const newCategoryNameInput = document.getElementById('newCategoryName');
    const newCategoryName = newCategoryNameInput.value.trim();

    if (!newCategoryName) {
        alert('Category name cannot be empty!');
        return;
    }

    const categoryKey = newCategoryName.toLowerCase().replace(/\s/g, ''); // Create a key from the name

    // Check if category already exists in English (as a proxy for both)
    if (translations['en-US'].buttons[categoryKey]) {
        alert(`Category "${newCategoryName}" already exists!`);
        return;
    }

    // Add to both English and Arabic translations
    translations['en-US'].buttons[categoryKey] = {
        categoryName: newCategoryName,
        elements: []
    };
    translations['ar-SA'].buttons[categoryKey] = {
        categoryName: newCategoryName,
        elements: []
    };

    saveData();
    updateUIText(); // Re-render categories
    populateCategorySelect(); // Update all category dropdowns in settings
    populateCategorySelectForRemoval();
    populateCategorySelectForElementRemoval();
    newCategoryNameInput.value = ''; // Clear input
    alert(`Category "${newCategoryName}" added!`);
}

function addElement(event) {
    event.preventDefault();
    const categoryKey = document.getElementById('selectCategoryForElement').value;
    const newElementTextInput = document.getElementById('newElementText');
    const newElementEmojiInput = document.getElementById('newElementEmoji');
    const newElementImageUrlInput = document.getElementById('newElementImageUrl');

    const newElementText = newElementTextInput.value.trim();
    const newElementEmoji = newElementEmojiInput.value.trim();
    const newElementImageUrl = newElementImageUrlInput.value.trim();

    if (!categoryKey || !newElementText || (!newElementEmoji && !newElementImageUrl)) {
        alert('Please fill in all required fields (Text and either Emoji or Image URL).');
        return;
    }

    const newElement = {
        text: newElementText,
        emoji: newElementEmoji,
        imageUrl: newElementImageUrl
    };

    // Add to both English and Arabic translations for the selected category
    if (translations['en-US'].buttons[categoryKey]) {
        translations['en-US'].buttons[categoryKey].elements.push(newElement);
    }
    if (translations['ar-SA'].buttons[categoryKey]) {
        translations['ar-SA'].buttons[categoryKey].elements.push(newElement);
    }

    saveData();
    // If the current category is the one being modified, refresh its display
    const activeCategoryBtn = document.querySelector('.category-btn.active');
    if (activeCategoryBtn && activeCategoryBtn.onclick.toString().includes(`showCategory('${categoryKey}')`)) {
        showCategory(categoryKey);
    }
    populateElementSelectForRemoval(); // Refresh element dropdown
    newElementTextInput.value = '';
    newElementEmojiInput.value = '';
    newElementImageUrlInput.value = '';
    alert(`Element "${newElementText}" added to category "${translations[selectedLanguage].buttons[categoryKey].categoryName || categoryKey}"!`);
}

function removeCategory(event) {
    event.preventDefault();
    const categoryKeyToRemove = document.getElementById('selectCategoryToRemove').value;

    if (!categoryKeyToRemove) {
        alert('Please select a category to remove.');
        return;
    }

    const categoryDisplayName = translations[selectedLanguage].buttons[categoryKeyToRemove]?.categoryName || categoryKeyToRemove;

    if (!confirm(`Are you sure you want to remove the category "${categoryDisplayName}" and all its elements? This action cannot be undone.`)) {
        return;
    }

    // Remove from both English and Arabic translations
    delete translations['en-US'].buttons[categoryKeyToRemove];
    delete translations['ar-SA'].buttons[categoryKeyToRemove];

    saveData();
    updateUIText(); // Re-render categories
    populateCategorySelect(); // Update all category dropdowns in settings
    populateCategorySelectForRemoval();
    populateCategorySelectForElementRemoval();
    document.getElementById('selectCategoryToRemove').value = ''; // Clear selection

    closeSettingsModal(); // Close modal BEFORE the alert
    alert(`Category "${categoryDisplayName}" removed!`);

    // After removing, ensure a valid category is displayed.
    // If the removed category was the active one, default to the first available.
    const firstAvailableCategory = Object.keys(currentButtonsData)[0];
    if (firstAvailableCategory) {
        showCategory(firstAvailableCategory);
    } else {
        // If no categories left, clear the grid
        document.getElementById('buttonsGrid').innerHTML = '';
    }
}

function removeElement(event) {
    event.preventDefault();
    const categoryKey = document.getElementById('selectCategoryForElementRemoval').value;
    const elementIndex = document.getElementById('selectElementToRemove').value;

    if (!categoryKey || elementIndex === "") {
        alert('Please select both a category and an element to remove.');
        return;
    }

    const elementText = translations[selectedLanguage].buttons[categoryKey].elements[elementIndex]?.text;

    if (!elementText) { // Defensive check if element doesn't exist for some reason
        alert('Selected element not found.');
        return;
    }

    if (!confirm(`Are you sure you want to remove the element "${elementText}" from category "${translations[selectedLanguage].buttons[categoryKey].categoryName || categoryKey}"?`)) {
        return;
    }

    // Remove from both English and Arabic translations
    translations['en-US'].buttons[categoryKey].elements.splice(elementIndex, 1);
    translations['ar-SA'].buttons[categoryKey].elements.splice(elementIndex, 1);

    saveData();
    // If the current category is the one being modified, refresh its display
    const activeCategoryBtn = document.querySelector('.category-btn.active');
    if (activeCategoryBtn && activeCategoryBtn.onclick.toString().includes(`showCategory('${categoryKey}')`)) {
        showCategory(categoryKey);
    }
    populateElementSelectForRemoval(); // Refresh element dropdown
    document.getElementById('selectCategoryForElementRemoval').value = ''; // Clear selections
    document.getElementById('selectElementToRemove').value = '';
    alert(`Element "${elementText}" removed!`);
}

// Keyboard Functions
function toggleKeyboard() {
    const keyboardContainer = document.getElementById('keyboardContainer');
    isKeyboardVisible = !isKeyboardVisible;
    keyboardContainer.style.display = isKeyboardVisible ? 'flex' : 'none';
    // When keyboard is visible, hide category buttons and vice-versa
    document.getElementById('categoryTabs').style.display = isKeyboardVisible ? 'none' : 'flex';
    document.getElementById('buttonsGrid').style.display = isKeyboardVisible ? 'none' : 'grid';
    updateKeyboardLayout(); // Ensure the correct keyboard is shown/hidden
}

function updateKeyboardLayout() {
    const englishKeyboard = document.getElementById('englishKeyboard');
    const arabicKeyboard = document.getElementById('arabicKeyboard');

    if (selectedLanguage === 'ar-SA') {
        englishKeyboard.style.display = 'none';
        arabicKeyboard.style.display = 'flex'; // Use flex to maintain column layout
    } else {
        englishKeyboard.style.display = 'flex'; // Use flex to maintain column layout
        arabicKeyboard.style.display = 'none';
    }
}

function handleKeyboardInput(event) {
    const key = event.target.dataset.key;
    let charToAdd = key;

    if (key === 'shift') {
        isShiftActive = !isShiftActive;
        // Toggle case for English letters, or specific Arabic shift behavior if needed
        document.querySelectorAll(`#${selectedLanguage === 'ar-SA' ? 'arabicKeyboard' : 'englishKeyboard'} .keyboard-key`).forEach(k => {
            const dataKey = k.dataset.key;
            if (selectedLanguage === 'en-US' && dataKey.length === 1 && dataKey.match(/[a-z]/i)) { // Only letters for English
                k.textContent = isShiftActive ? dataKey.toUpperCase() : dataKey.toLowerCase();
            }
            // Add Arabic shift logic here if needed (e.g., for secondary characters)
        });
        // Add/remove 'active' class for visual feedback on shift key
        event.target.classList.toggle('active', isShiftActive);
        return; // Don't add 'shift' to message
    }

    if (key === 'backspace') {
        if (currentMessage.length > 0) {
            let lastWord = currentMessage[currentMessage.length - 1];
            if (lastWord.length > 0) { // Check if the last word is not empty
                currentMessage[currentMessage.length - 1] = lastWord.slice(0, -1);
            } else if (currentMessage.length > 0) { // If last word is empty (was a space), remove it
                currentMessage.pop();
            }
        }
    } else if (key === ' ') { // Space key
        // Only add a space if the last item isn't already a space or if the message is empty
        if (currentMessage.length === 0 || currentMessage[currentMessage.length - 1] !== '') {
            currentMessage.push(''); // Add an empty string to represent a space
        }
    } else if (key === 'enter') {
        speakMessage(); // Speak the current message
        clearMessage(); // Clear after speaking
    } else if (key === '123' || key === '١٢٣') {
        // Toggle numbers/symbols (basic implementation)
        const keys = document.querySelectorAll(`#${selectedLanguage === 'ar-SA' ? 'arabicKeyboard' : 'englishKeyboard'} .keyboard-key`);
        keys.forEach(k => {
            const dataKey = k.dataset.key;
            if (selectedLanguage === 'en-US' && dataKey.length === 1 && dataKey.match(/[a-z]/i)) {
                // Simple toggle for now, could expand to full symbol sets
                if (k.textContent === dataKey.toLowerCase() || k.textContent === dataKey.toUpperCase()) {
                    k.textContent = getNumberOrSymbol(dataKey, 'en-US');
                } else {
                    k.textContent = isShiftActive ? dataKey.toUpperCase() : dataKey.toLowerCase();
                }
            } else if (selectedLanguage === 'ar-SA' && dataKey.length === 1 && dataKey.match(/[\u0600-\u06FF]/)) { // Arabic characters
                // Simple toggle for Arabic numbers/symbols
                if (k.textContent === dataKey) {
                    k.textContent = getNumberOrSymbol(dataKey, 'ar-SA');
                } else {
                    k.textContent = dataKey; // Revert to original Arabic character
                }
            }
        });
    }
    else {
        if (selectedLanguage === 'en-US' && isShiftActive && charToAdd.length === 1) {
            charToAdd = charToAdd.toUpperCase();
        }
        // If the last element is an empty string (from a space), or if message is empty, add new word
        if (currentMessage.length === 0 || currentMessage[currentMessage.length - 1] === '') {
            currentMessage.push(charToAdd);
        } else {
            currentMessage[currentMessage.length - 1] += charToAdd;
        }
    }
    updateMessageArea();
    // Reset shift after a character is typed, unless it's a special key like 123
    if (key !== 'shift' && key !== '123' && key !== '١٢٣') {
        isShiftActive = false;
        document.querySelectorAll('.keyboard-key[data-key="shift"]').forEach(s => s.classList.remove('active'));
    }
}

function getNumberOrSymbol(char, lang) {
    if (lang === 'en-US') {
        const map = {
            'q': '1', 'w': '2', 'e': '3', 'r': '4', 't': '5', 'y': '6', 'u': '7', 'i': '8', 'o': '9', 'p': '0',
            'a': '@', 's': '#', 'd': '$', 'f': '%', 'g': '&', 'h': '*', 'j': '(', 'k': ')', 'l': '-',
            'z': '+', 'x': '=', 'c': '/', 'v': ':', 'b': ';', 'n': '"', 'm': "'", '.': '!', 'enter': '?'
        };
        return map[char.toLowerCase()] || char;
    } else if (lang === 'ar-SA') {
        const arabicMap = {
            'ض': '١', 'ص': '٢', 'ث': '٣', 'ق': '٤', 'ف': '٥', 'غ': '٦', 'ع': '٧', 'ه': '٨', 'خ': '٩', 'ح': '٠',
            'ج': '!', 'د': '@', 'ش': '#', 'س': '$', 'ي': '%', 'ب': '^', 'ل': '&', 'ا': '*', 'ت': '(', 'ن': ')',
            'م': '-', 'ك': '_', 'ط': '+', 'ئ': '=', 'ء': '/', 'ؤ': ':', 'ر': ';', 'لا': '"', 'ى': "'", 'ة': '<',
            'و': '>', 'ز': ',', 'ظ': '.', '.': '؟', 'enter': '\n'
        };
        return arabicMap[char] || char;
    }
    return char;
}
