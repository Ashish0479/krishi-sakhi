import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        signup: "Sign Up",
        login: "Login",
        about: "About Us",
        contact: "Contact Us",
        premium: "Get Premium",
        Krishi: "Krishi",
        Sakhi: "Sakhi",
      },
      hero: {
        title: "🌱 Krishi-Sakhi",
        desc: "Empowering Farmers with Smart & Personalized Agricultural Assistance. Get real-time crop guidance, weather insights, and AI-powered solutions at your fingertips.",
        getStarted: "Get Started",
        learnMore: "Learn More",
      },
      features: {
        title: "Why Choose Krishi-Sakhi?",
        weather: "🌦 Weather Updates",
        crop: "🌾 Crop Guidance",
        analytics: "📊 Smart Analytics",
      },
      mission: {
        title: "Our Mission",
        desc: "At Krishi-Sakhi, our mission is to empower every farmer with the tools and knowledge to grow smarter, live better, and secure their future. With AI-driven insights, we bridge the gap between technology and agriculture.",
      },
      how: {
        title: "How It Works",
        step1: "Step 1: Register",
        step2: "Step 2: Get Insights",
        step3: "Step 3: Take Action",
        step4: "Step 4: Track Progress",
      },
      join: {
        title: "Join the Smart Farming Revolution",
        desc: "Be part of a new era where technology meets tradition. Together, we can build a future where every farmer thrives.",
        btn: "Join Now",
      },
      farmer_login: "Farmer Login 🌱",
      email: "Email",
      password: "Password",
      login: "Login",
      signup: "Signup",
      no_account: "Don’t have an account?",
      fill_required: "Please fill all required fields",
      login_success: "Login successful!",
      login_failed: "Login failed. Please try again.",
      
      // Signup specific keys
      farmer_signup: "Farmer Signup 🌾",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      mobileLabel: "Mobile Number",
      passwordLabel: "Password",
      confirmPasswordLabel: "Confirm Password",
      landSizeLabel: "Land Size (in acres)",
      cropTypeLabel: "Crop Type",
      stateLabel: "State",
      districtLabel: "District",
      villageLabel: "Village",
      selectLand: "Select land size",
      selectCrop: "Select crop type",
      errorFill: "Please fill all required fields",
      errorPasswordMatch: "Passwords do not match",
      errorMobile: "Mobile number should be 10-12 digits",
      errorSignup: "Signup failed. Please try again.",
      signupBtn: "Register",
      alreadyAccount: "Already have an account?",
      goToLogin: "Login"
    },
  },
  
  ml: {
    translation: {
      nav: {
        home: "ഹോം",
        signup: "സൈൻ അപ്പ്",
        login: "ലോഗിൻ",
        about: "ഞങ്ങളെക്കുറിച്ച്",
        contact: "ബന്ധപ്പെടുക",
        premium: "പ്രീമിയം എടുക്കുക",
        KrishiSakhi: "കൃഷി-സഖി",
      },
      hero: {
        title: "🌱 കൃഷി-സഖി",
        desc: "സ്മാർട്ട് & വ്യക്തിഗത കാർഷിക സഹായത്തോടെ കർഷകരെ ശക്തിപ്പെടുത്തുന്നു. തത്സമയ വിള നിർദ്ദേശങ്ങൾ, കാലാവസ്ഥാ വിവരങ്ങൾ, AI അധിഷ്ഠിത പരിഹാരങ്ങൾ നിങ്ങളുടെ വിരൽത്തുമ്പിൽ.",
        getStarted: "ആരംഭിക്കുക",
        learnMore: "കൂടുതൽ അറിയുക",
      },
      features: {
        title: "എന്തുകൊണ്ട് കൃഷി-സഖി?",
        weather: "🌦 കാലാവസ്ഥാ അപ്ഡേറ്റുകൾ",
        crop: "🌾 വിള നിർദ്ദേശങ്ങൾ",
        analytics: "📊 സ്മാർട്ട് അനലിറ്റിക്സ്",
      },
      mission: {
        title: "ഞങ്ങളുടെ ദൗത്യം",
        desc: "ഓരോ കർഷകനെയും കൂടുതൽ സ്മാർട്ടായി വളരാനും, മികച്ച ജീവിതം നയിക്കാനും, ഭാവി സുരക്ഷിതമാക്കാനും ആവശ്യമായ ഉപകരണങ്ങളും അറിവുകളും നൽകുകയാണ് കൃഷി-സഖിയുടെ ദൗത്യം. AI അധിഷ്ഠിത അറിവുകളിലൂടെ കാർഷികവും സാങ്കേതികവിദ്യയും തമ്മിലുള്ള വിടവ് നികത്തുന്നു.",
      },
      how: {
        title: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു",
        step1: "പടി 1: രജിസ്റ്റർ ചെയ്യുക",
        step2: "പടി 2: അറിവുകൾ നേടുക",
        step3: "പടി 3: നടപടി സ്വീകരിക്കുക",
        step4: "പടി 4: പുരോഗതി നിരീക്ഷിക്കുക",
      },
      join: {
        title: "സ്മാർട്ട് കാർഷിക വിപ്ലവത്തിൽ ചേരൂ",
        desc: "സാങ്കേതികവിദ്യയും പരമ്പരാഗതവും ഒരുമിക്കുന്ന പുതിയ കാലഘട്ടത്തിന്റെ ഭാഗമാകൂ. ഒരുമിച്ച്, ഓരോ കർഷകനും വളരുന്ന ഒരു ഭാവി നിർമ്മിക്കാം.",
        btn: "ഇപ്പോൾ ചേരുക",
      },
      farmer_login: "കർഷകൻ ലോഗിൻ 🌱",
      email: "ഇമെയിൽ",
      password: "പാസ്വേഡ്",
      login: "ലോഗിൻ",
      signup: "സൈൻ അപ്പ്",
      no_account: "അക്കൗണ്ട് ഇല്ലേ?",
      fill_required: "ദയവായി എല്ലാ ആവശ്യമായ ഫീൽഡുകളും പൂരിപ്പിക്കുക",
      login_success: "ലോഗിൻ വിജയകരമായി!",
      login_failed: "ലോഗിൻ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക.",
      
      // Signup specific
      farmer_signup: "കർഷക രജിസ്ട്രേഷൻ 🌾",
      nameLabel: "പൂർണ്ണ പേര്",
      emailLabel: "ഇമെയിൽ വിലാസം",
      mobileLabel: "മൊബൈൽ നമ്പർ",
      passwordLabel: "പാസ്‌വേഡ്",
      confirmPasswordLabel: "പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക",
      landSizeLabel: "കൃഷിയിടത്തിന്റെ വലുപ്പം (ഏക്കർ)",
      cropTypeLabel: "വിളയുടെ തരം",
      stateLabel: "സംസ്ഥാനം",
      districtLabel: "ജില്ല",
      villageLabel: "ഗ്രാമം",
      selectLand: "കൃഷിയിടത്തിന്റെ വലുപ്പം തിരഞ്ഞെടുക്കുക",
      selectCrop: "വിളയുടെ തരം തിരഞ്ഞെടുക്കുക",
      errorFill: "ദയവായി എല്ലാ ആവശ്യമായ വിവരങ്ങളും പൂരിപ്പിക്കുക",
      errorPasswordMatch: "പാസ്‌വേഡുകൾ പൊരുത്തപ്പെടുന്നില്ല",
      errorMobile: "മൊബൈൽ നമ്പർ 10-12 അക്കങ്ങൾ ആയിരിക്കണം",
      errorSignup: "രജിസ്ട്രേഷൻ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക",
      signupBtn: "രജിസ്റ്റർ ചെയ്യുക",
      alreadyAccount: "ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?",
      goToLogin: "ലോഗിൻ",
      state: "സംസ്ഥാനം",
      district: "ജില്ല",
      village: "ഗ്രാമം",
      name: "പേര്",
      mobile: "മൊബൈൽ", 
      land: "കൃഷിയിടത്തിന്റെ വലുപ്പം",
      size: "വലുപ്പം",
      crop: "വിള",
      type: "തരം",
      confirm: "സ്ഥിരീകരിക്കുക",
     
    
      number: "നമ്പർ",
      select:" തിരഞ്ഞെടുക്കുക",
      acres:"ഏക്കർ",
      acre:"ഏക്കർ",
      wheat:"ഗോധുമ",
      rice:"അരി",
      maize:"മക്ക"
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
