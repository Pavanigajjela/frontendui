import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

// Real image URLs
const courseImages = {
  webDev: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&h=340&fit=crop",
  react: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=340&fit=crop",
  javascript: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=340&fit=crop",
  nodejs: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=340&fit=crop",
  flutter: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=340&fit=crop",
  marketing: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=340&fit=crop",
  business: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=340&fit=crop",
  datascience: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop",
  design: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=340&fit=crop",
  photography: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=600&h=340&fit=crop",
  music: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=340&fit=crop",
  yoga: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=340&fit=crop",
  development: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=100&h=100&fit=crop",
  businessImg: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=100&h=100&fit=crop",
  financeImg: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop",
  itImg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=100&h=100&fit=crop",
  designImg: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop",
  marketingImg: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=100&h=100&fit=crop",
  photographyImg: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=100&h=100&fit=crop",
  musicImg: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&h=100&fit=crop",
  healthImg: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop"
};

const LandingPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activeTab, setActiveTab] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [visibleCourses, setVisibleCourses] = useState(8);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLearningModal, setShowLearningModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    avatar: '',
    bio: '',
    occupation: ''
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    // Only load enrolled courses if user is logged in
    if (isLoggedIn) {
      const savedEnrolled = localStorage.getItem('enrolledCourses');
      if (savedEnrolled) setEnrolledCourses(JSON.parse(savedEnrolled));
    } else {
      setEnrolledCourses([]);
    }

    setProfileData({
      name: localStorage.getItem('userName') || '',
      email: localStorage.getItem('userEmail') || '',
      avatar: localStorage.getItem('userAvatar') || '',
      bio: localStorage.getItem('userBio') || '',
      occupation: localStorage.getItem('userOccupation') || ''
    });
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save enrolled courses only when logged in and they change
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
    }
  }, [enrolledCourses, isLoggedIn]);

  const showMessage = (msg) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({...profileData, avatar: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = (course, e) => {
    e.stopPropagation();
    
    if (!isLoggedIn) {
      showMessage('Please login to add items to cart');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    
    const existingItem = cart.find(item => item.id === course.id);
    if (existingItem) {
      showMessage(`${course.title} is already in your cart!`);
    } else {
      setCart([...cart, { ...course, quantity: 1 }]);
      showMessage(`${course.title} added to cart!`);
    }
  };

  const handleEnroll = (course, e) => {
    e.stopPropagation();
    
    if (!isLoggedIn) {
      showMessage('Please login to enroll in courses');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    
    if (enrolledCourses.find(c => c.id === course.id)) {
      showMessage(`You are already enrolled in ${course.title}!`);
      return;
    }
    
    const updatedEnrolled = [...enrolledCourses, { ...course, enrolledAt: new Date().toISOString(), progress: 0 }];
    setEnrolledCourses(updatedEnrolled);
    
    const updatedCart = cart.filter(item => item.id !== course.id);
    setCart(updatedCart);
    
    showMessage(`Successfully enrolled in ${course.title}!`);
  };

  const handleRemoveFromCart = (courseId, e) => {
    e.stopPropagation();
    const updatedCart = cart.filter(item => item.id !== courseId);
    setCart(updatedCart);
    showMessage(`Removed from cart`);
  };

  const handleLogout = () => {
    // Clear all user-specific data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userBio');
    localStorage.removeItem('userOccupation');
    localStorage.removeItem('enrolledCourses');
    localStorage.removeItem('cart');
    
    setIsLoggedIn(false);
    setEnrolledCourses([]);
    setCart([]);
    showMessage('Logged out successfully');
    navigate('/');
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', profileData.name);
    localStorage.setItem('userEmail', profileData.email);
    localStorage.setItem('userAvatar', profileData.avatar);
    localStorage.setItem('userBio', profileData.bio);
    localStorage.setItem('userOccupation', profileData.occupation);
    setIsLoggedIn(true);
    setShowProfileModal(false);
    setAvatarFile(null);
    showMessage('Profile updated successfully!');
  };

  const categories = [
    { 
      id: 'development', 
      name: "Development", 
      image: courseImages.development,
      color: "#4CAF50", 
      description: "Learn programming and web development",
      subcategories: ["Web Development", "JavaScript", "React", "Node.js", "Mobile Development", "Game Development", "Databases"]
    },
    { 
      id: 'finance', 
      name: "Finance", 
      image: courseImages.financeImg,
      color: "#FF9800", 
      description: "Understand finance and accounting",
      subcategories: ["Accounting", "Investment", "Trading", "Cryptocurrency", "Personal Finance", "Risk Management"]
    },
    { 
      id: 'it', 
      name: "IT & Software", 
      image: courseImages.itImg,
      color: "#9C27B0", 
      description: "Explore IT and software development",
      subcategories: ["Cloud Computing", "Cybersecurity", "DevOps", "Networking", "System Administration", "Data Science"]
    },
    { 
      id: 'design', 
      name: "Design", 
      image: courseImages.designImg,
      color: "#E91E63", 
      description: "Learn UI/UX and graphic design",
      subcategories: ["UI/UX Design", "Graphic Design", "Web Design", "3D Animation", "Figma", "Adobe Suite"]
    },
    { 
      id: 'marketing', 
      name: "Marketing", 
      image: courseImages.marketingImg,
      color: "#00BCD4", 
      description: "Master digital marketing",
      subcategories: ["SEO", "Social Media", "Content Marketing", "Email Marketing", "Analytics", "Branding"]
    },
  ];

  // Removed Python course (id: 2)
  const allCourses = [
    { id: 1, title: "The Complete Web Development Bootcamp", instructor: "Dr. Angela Yu", rating: 4.8, students: 456789, price: "₹3,499", oldPrice: "₹12,999", category: "Development", categoryId: "development", subcategory: "Web Development", image: courseImages.webDev, bestseller: true, level: "Beginner", duration: "56 hrs", tags: ["web", "html", "css", "javascript"] },
    { id: 3, title: "React - The Complete Guide", instructor: "Maximilian S", rating: 4.7, students: 345678, price: "₹2,999", oldPrice: "₹9,999", category: "Development", categoryId: "development", subcategory: "React", image: courseImages.react, bestseller: false, level: "Intermediate", duration: "48 hrs", tags: ["react", "frontend"] },
    { id: 4, title: "JavaScript: Advanced Concepts", instructor: "Andrei Neagoie", rating: 4.8, students: 234567, price: "₹2,499", oldPrice: "₹7,999", category: "Development", categoryId: "development", subcategory: "JavaScript", image: courseImages.javascript, bestseller: false, level: "Advanced", duration: "32 hrs", tags: ["javascript"] },
    { id: 5, title: "Node.js, Express, MongoDB Bootcamp", instructor: "Jonas S", rating: 4.9, students: 198765, price: "₹3,499", oldPrice: "₹10,999", category: "Development", categoryId: "development", subcategory: "Node.js", image: courseImages.nodejs, bestseller: true, level: "Intermediate", duration: "42 hrs", tags: ["nodejs", "backend"] },
    { id: 6, title: "Flutter & Dart - Complete Guide", instructor: "Maximilian S", rating: 4.8, students: 156789, price: "₹2,999", oldPrice: "₹8,999", category: "Development", categoryId: "development", subcategory: "Mobile Development", image: courseImages.flutter, bestseller: false, level: "Beginner", duration: "38 hrs", tags: ["flutter", "mobile"] },
    { id: 7, title: "Complete Digital Marketing Course", instructor: "Rob Percival", rating: 4.6, students: 189654, price: "₹2,999", oldPrice: "₹8,999", category: "Business", categoryId: "business", subcategory: "Marketing", image: courseImages.marketing, bestseller: true, level: "Beginner", duration: "28 hrs", tags: ["marketing", "digital"] },
    { id: 8, title: "Business Strategy Management", instructor: "Chris Croft", rating: 4.7, students: 98765, price: "₹2,499", oldPrice: "₹6,999", category: "Business", categoryId: "business", subcategory: "Management", image: courseImages.business, bestseller: false, level: "Intermediate", duration: "22 hrs", tags: ["strategy", "business"] },
    { id: 9, title: "Data Science & ML Bootcamp", instructor: "Jose Portilla", rating: 4.8, students: 345678, price: "₹4,499", oldPrice: "₹15,999", category: "IT & Software", categoryId: "it", subcategory: "Data Science", image: courseImages.datascience, bestseller: true, level: "Intermediate", duration: "52 hrs", tags: ["datascience", "ml"] },
    { id: 10, title: "UI/UX Design Bootcamp", instructor: "Joe Natoli", rating: 4.7, students: 143210, price: "₹2,999", oldPrice: "₹9,999", category: "Design", categoryId: "design", subcategory: "UI/UX Design", image: courseImages.design, bestseller: false, level: "All Levels", duration: "40 hrs", tags: ["uiux", "design"] },
    { id: 11, title: "Photography Masterclass", instructor: "Phil Ebiner", rating: 4.8, students: 234567, price: "₹2,999", oldPrice: "₹8,999", category: "Photography", categoryId: "photography", subcategory: "Portrait", image: courseImages.photography, bestseller: true, level: "Beginner", duration: "28 hrs", tags: ["photography"] },
    { id: 12, title: "Music Production in Logic Pro X", instructor: "Tomas George", rating: 4.8, students: 87654, price: "₹3,499", oldPrice: "₹10,999", category: "Music", categoryId: "music", subcategory: "Production", image: courseImages.music, bestseller: true, level: "Beginner", duration: "42 hrs", tags: ["music", "production"] },
    { id: 13, title: "Complete Yoga Certificate", instructor: "David Smith", rating: 4.7, students: 87654, price: "₹2,499", oldPrice: "₹6,999", category: "Health & Fitness", categoryId: "health", subcategory: "Yoga", image: courseImages.yoga, bestseller: true, level: "All Levels", duration: "25 hrs", tags: ["yoga", "fitness"] }
  ];

  const getFilteredCourses = () => {
    let filtered = activeCategory === 'all' 
      ? allCourses 
      : allCourses.filter(course => course.categoryId === activeCategory);
    
    if (activeSubcategory) {
      filtered = filtered.filter(course => course.subcategory === activeSubcategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (sortBy === 'popular') filtered.sort((a, b) => b.students - a.students);
    else if (sortBy === 'highest-rated') filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'price-low') filtered.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
    else if (sortBy === 'price-high') filtered.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));
    
    return filtered;
  };

  const filteredCourses = getFilteredCourses();
  const displayedCourses = filteredCourses.slice(0, visibleCourses);
  const hasMoreCourses = filteredCourses.length > visibleCourses;

  const getTabCourses = () => {
    let courses = activeCategory === 'all' ? allCourses : allCourses.filter(c => c.categoryId === activeCategory);
    if (activeSubcategory) {
      courses = courses.filter(c => c.subcategory === activeSubcategory);
    }
    if (activeTab === 'popular') return [...courses].sort((a, b) => b.students - a.students).slice(0, 8);
    if (activeTab === 'top-rated') return [...courses].sort((a, b) => b.rating - a.rating).slice(0, 8);
    return courses.slice(0, 8);
  };

  const currentCategory = categories.find(cat => cat.id === activeCategory);
  const cartTotal = cart.reduce((sum, item) => sum + parseInt(item.price.replace(/[^0-9]/g, '')), 0);

  return (
    <div className="landing-page">
      {showNotification && (
        <div className="notification-toast">
          {notificationMsg}
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              ☰
            </div>
            <div className="logo" onClick={() => navigate('/')}>
              SkillHub
            </div>
          </div>
          
          <form className="search-bar" onSubmit={(e) => { 
            e.preventDefault(); 
            showMessage(`Found ${filteredCourses.length} results`); 
          }}>
            <input 
              type="text" 
              placeholder="Search for anything..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <button type="submit" className="search-btn"></button>
          </form>
          
          <div className="nav-right">
            {isLoggedIn ? (
              <>
                <div className="user-menu">
                  <div className="user-avatar-small" onClick={() => setShowProfileModal(true)}>
                    {profileData.avatar ? (
                      <img src={profileData.avatar} alt="avatar" />
                    ) : (
                      profileData.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="user-name-nav">Hello, {profileData.name.split(' ')[0]}</span>
                  <div className="user-dropdown">
                    <button className="dropdown-btn">▼</button>
                    <div className="dropdown-content">
                      <button onClick={() => setShowProfileModal(true)}>My Profile</button>
                      <button onClick={() => setShowLearningModal(true)}>My Learning ({enrolledCourses.length})</button>
                      <button onClick={() => setShowCartModal(true)}>Cart ({cart.length})</button>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  </div>
                </div>
                <button className="cart-icon" onClick={() => setShowCartModal(true)}>
                  🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                </button>
              </>
            ) : (
              <>
                <button className="nav-btn teach-btn" onClick={() => navigate('/login')}>Teach on SkillHub</button>
                <button className="nav-btn login-btn" onClick={() => navigate('/login')}>Log in</button>
                <button className="nav-btn signup-btn" onClick={() => navigate('/signup')}>Sign up</button>
              </>
            )}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="categories-navbar">
          <div className="categories-container">
            <div 
              className={`category-nav-item ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => { setActiveCategory('all'); setActiveSubcategory(null); setVisibleCourses(8); }}
            >
              All Categories
            </div>
            {categories.map(category => (
              <div 
                key={category.id} 
                className={`category-nav-item ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => { setActiveCategory(category.id); setActiveSubcategory(null); setVisibleCourses(8); }}
              >
                <img src={category.image} alt={category.name} className="category-nav-icon" />
                <span>{category.name}</span>
                {activeCategory === category.id && (
                  <div className="category-submenu">
                    {category.subcategories.map(sub => (
                      <div 
                        key={sub} 
                        className="submenu-item"
                        onClick={(e) => { e.stopPropagation(); setActiveSubcategory(sub); setVisibleCourses(8); }}
                      >
                        {sub}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="mobile-menu">
            {isLoggedIn ? (
              <>
                <button onClick={() => setShowProfileModal(true)}>My Profile</button>
                <button onClick={() => setShowLearningModal(true)}>My Learning ({enrolledCourses.length})</button>
                <button onClick={() => setShowCartModal(true)}>Cart ({cart.length})</button>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')}>Log in</button>
                <button onClick={() => navigate('/signup')}>Sign up</button>
              </>
            )}
            <button onClick={() => setShowExploreModal(true)}>Explore Categories</button>
          </div>
        )}
      </nav>

      {/* Hero Banner - Different for Before/After Login */}
      <div className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content-new">
          {!isLoggedIn ? (
            <>
              <h1 className="hero-title">Start Your Learning Journey Today</h1>
              <p className="hero-subtitle">Join millions of students learning from world-class instructors</p>
              <div className="hero-buttons">
                <button className="hero-btn-primary" onClick={() => navigate('/login')}>Get Started Free</button>
                
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Online Courses</span>
                </div>
                <div className="stat">
                  <span className="stat-number">5M+</span>
                  <span className="stat-label">Students</span>
                </div>
                <div className="stat">
                  <span className="stat-number">2K+</span>
                  <span className="stat-label">Expert Instructors</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="hero-title">Welcome Back, {profileData.name.split(' ')[0]}!</h1>
              <p className="hero-subtitle">Continue your learning journey. You have {enrolledCourses.length} courses in progress.</p>
              <div className="hero-buttons">
                <button className="hero-btn-primary" onClick={() => setShowLearningModal(true)}>Continue Learning</button>
                <button className="hero-btn-secondary" onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}>
                  Explore New Courses
                </button>
              </div>
              {enrolledCourses.length > 0 && (
                <div className="recent-courses">
                  <p>Recently active:</p>
                  <div className="recent-course-list">
                    {enrolledCourses.slice(0, 3).map(course => (
                      <span key={course.id} className="recent-course-tag">{course.title.split(':')[0]}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Category Banner */}
      {activeCategory !== 'all' && currentCategory && (
        <div className="category-banner" style={{ background: `linear-gradient(135deg, ${currentCategory.color}20 0%, ${currentCategory.color}40 100%)` }}>
          <div className="container">
            <div className="category-banner-content">
              <img src={currentCategory.image} alt={currentCategory.name} className="category-banner-icon" />
              <div className="category-banner-info">
                <h1>{currentCategory.name}</h1>
                <p>{currentCategory.description}</p>
                <div className="category-stats">
                  <span>📚 {allCourses.filter(c => c.categoryId === currentCategory.id).length} courses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subcategories Bar */}
      {activeCategory !== 'all' && currentCategory && (
        <div className="subcategories-bar">
          <div className="container">
            <div className="subcategories-scroll">
              <span 
                className={`subcategory-chip ${activeSubcategory === null ? 'active' : ''}`}
                onClick={() => setActiveSubcategory(null)}
              >
                All {currentCategory.name}
              </span>
              {currentCategory.subcategories.map(sub => (
                <span 
                  key={sub} 
                  className={`subcategory-chip ${activeSubcategory === sub ? 'active' : ''}`}
                  onClick={() => setActiveSubcategory(sub)}
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trusted Companies */}
      <div className="trusted-section">
        <div className="container">
          <p>Trusted by over 10,000+ companies worldwide</p>
          <div className="company-logos">
            <span>Google</span>
            <span>Netflix</span>
            <span>Twitter</span>
            <span>Facebook</span>
            <span>Microsoft</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {!searchQuery && (
        <div className="tabs-section" id="courses-section">
          <div className="container">
            <div className="tabs">
              <button className={`tab-btn ${activeTab === 'popular' ? 'active' : ''}`} onClick={() => setActiveTab('popular')}>
                Most Popular
              </button>
              <button className={`tab-btn ${activeTab === 'top-rated' ? 'active' : ''}`} onClick={() => setActiveTab('top-rated')}>
                Top Rated
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      <div className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>
              {searchQuery ? 'Search Results' : 
               activeCategory === 'all' ? (activeTab === 'popular' ? 'Most Popular Courses' : 'Top Rated Courses') : 
               activeSubcategory ? `${activeSubcategory} Courses` : `${currentCategory?.name} Courses`}
            </h2>
            <div className="sort-filter">
              <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="popular">Most Popular</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          <div className="courses-grid">
            {(searchQuery ? filteredCourses : getTabCourses()).slice(0, visibleCourses).map(course => (
              <div key={course.id} className="course-card" onClick={() => { setSelectedCourse(course); setShowPreviewModal(true); }}>
                {course.bestseller && <div className="course-badge">Bestseller</div>}
                <div className="course-image">
                  <img src={course.image} alt={course.title} />
                  <div className="course-hover-actions">
                    <button className="preview-btn" onClick={(e) => { e.stopPropagation(); setSelectedCourse(course); setShowPreviewModal(true); }}>
                      Quick Preview
                    </button>
                  </div>
                </div>
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p className="instructor">{course.instructor}</p>
                  <div className="rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating-value">{course.rating}</span>
                    <span className="students-count">({course.students.toLocaleString()})</span>
                  </div>
                  <div className="course-meta">
                    <span className="level">{course.level}</span>
                    <span className="duration">{course.duration}</span>
                  </div>
                  <div className="price">
                    <span className="current-price">{course.price}</span>
                    <span className="old-price">{course.oldPrice}</span>
                  </div>
                  <div className="course-actions">
                    {enrolledCourses.find(c => c.id === course.id) ? (
                      <button className="enrolled-btn" disabled>✓ Enrolled</button>
                    ) : (
                      <>
                        <button className="cart-btn-small" onClick={(e) => handleAddToCart(course, e)}>
                          Add to Cart
                        </button>
                        {isLoggedIn && (
                          <button className="enroll-btn-small" onClick={(e) => handleEnroll(course, e)}>
                            Enroll Now
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {hasMoreCourses && (
            <div className="load-more">
              <button className="load-more-btn" onClick={() => setVisibleCourses(prev => prev + 8)}>
                Load More Courses →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category Highlights */}
      {activeCategory === 'all' && !searchQuery && (
        <div className="category-highlights">
          <div className="container">
            <h2>Explore by Category</h2>
            <div className="category-highlights-grid">
              {categories.map(cat => (
                <div key={cat.id} className="category-highlight-card" onClick={() => { setActiveCategory(cat.id); setVisibleCourses(8); }}>
                  <div className="category-highlight-icon" style={{ background: `${cat.color}20` }}>
                    <img src={cat.image} alt={cat.name} />
                  </div>
                  <h3>{cat.name}</h3>
                  <p>{allCourses.filter(c => c.categoryId === cat.id).length} courses</p>
                  <button className="explore-category-btn">Explore →</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <div className="testimonials-section">
        <div className="container">
          <h2>What our students say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-avatar">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Sarah" />
              </div>
              <div>
                <div className="testimonial-stars">★★★★★</div>
                <p>"The web development bootcamp changed my career!"</p>
                <h4>Sarah Johnson</h4>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael" />
              </div>
              <div>
                <div className="testimonial-stars">★★★★★</div>
                <p>"Best investment I ever made!"</p>
                <h4>Michael Chen</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor CTA */}
      <div className="instructor-section">
        <div className="container">
          <div className="instructor-content">
            <div>
              <h2>Become an instructor</h2>
              <p>Share your knowledge with millions of learners worldwide.</p>
              <button className="instructor-btn" onClick={() => navigate('/login')}>
                Start teaching today
              </button>
            </div>
            <div className="instructor-image">
              <div className="image-icon">
                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Sarah" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowProfileModal(false)}>✕</button>
            <h2>My Profile</h2>
            <form onSubmit={handleUpdateProfile}>
              <div className="avatar-upload-section">
                <div className="avatar-preview" onClick={() => fileInputRef.current?.click()}>
                  {profileData.avatar ? (
                    <img src={profileData.avatar} alt="Profile" />
                  ) : (
                    <div className="avatar-placeholder">
                      {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <div className="avatar-edit-overlay">
                    <span>📷</span>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
                <p className="avatar-hint">Click on avatar to upload image</p>
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={profileData.name} 
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={profileData.email} 
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Occupation</label>
                <input 
                  type="text" 
                  value={profileData.occupation} 
                  onChange={(e) => setProfileData({...profileData, occupation: e.target.value})}
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div className="form-group">
                <label>Bio</label>
                <textarea 
                  value={profileData.bio} 
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  placeholder="Tell us about yourself"
                  rows="3"
                />
              </div>
              <button type="submit" className="save-profile-btn">Save Changes</button>
            </form>
          </div>
        </div>
      )}

      {/* My Learning Modal */}
      {showLearningModal && (
        <div className="modal-overlay" onClick={() => setShowLearningModal(false)}>
          <div className="learning-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLearningModal(false)}>✕</button>
            <h2>My Learning</h2>
            {enrolledCourses.length === 0 ? (
              <div className="empty-learning">
                <p>You haven't enrolled in any courses yet.</p>
                <button onClick={() => setShowLearningModal(false)}>Browse Courses</button>
              </div>
            ) : (
              <div className="enrolled-courses-list">
                {enrolledCourses.map(course => (
                  <div key={course.id} className="enrolled-course-item">
                    <img src={course.image} alt={course.title} />
                    <div className="enrolled-course-info">
                      <h3>{course.title}</h3>
                      <p>{course.instructor}</p>
                      <div className="course-progress">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${course.progress || 0}%` }}></div>
                        </div>
                        <span>{course.progress || 0}% Complete</span>
                      </div>
                    </div>
                    <button className="continue-btn">Continue Learning</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCartModal && (
        <div className="modal-overlay" onClick={() => setShowCartModal(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCartModal(false)}>✕</button>
            <h2>Your Cart ({cart.length} items)</h2>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty</p>
                <button onClick={() => setShowCartModal(false)}>Continue Shopping</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.title} />
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.instructor}</p>
                        <span>{item.price}</span>
                      </div>
                      <button onClick={(e) => handleRemoveFromCart(item.id, e)}>Remove</button>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <h3>Total: ₹{cartTotal.toLocaleString()}</h3>
                  <button className="checkout-btn">Proceed to Checkout</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Course Preview Modal */}
      {showPreviewModal && selectedCourse && (
        <div className="modal-overlay" onClick={() => setShowPreviewModal(false)}>
          <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPreviewModal(false)}>✕</button>
            <img src={selectedCourse.image} alt={selectedCourse.title} />
            <h2>{selectedCourse.title}</h2>
            <p>By {selectedCourse.instructor}</p>
            <div className="preview-stats">
              <span>⭐ {selectedCourse.rating}</span>
              <span>👥 {selectedCourse.students.toLocaleString()}</span>
              <span>📚 {selectedCourse.level}</span>
              <span>⏱️ {selectedCourse.duration}</span>
            </div>
            <div className="preview-price">
              <span className="current-price">{selectedCourse.price}</span>
              <span className="old-price">{selectedCourse.oldPrice}</span>
            </div>
            <div className="preview-actions">
              {enrolledCourses.find(c => c.id === selectedCourse.id) ? (
                <button className="enrolled-btn-large">✓ Already Enrolled</button>
              ) : (
                <>
                  <button className="preview-cart-btn" onClick={() => { handleAddToCart(selectedCourse, {}); setShowPreviewModal(false); }}>
                    Add to Cart
                  </button>
                  {isLoggedIn && (
                    <button className="preview-enroll-btn" onClick={() => { handleEnroll(selectedCourse, {}); setShowPreviewModal(false); }}>
                      Enroll Now
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Explore Modal */}
      {showExploreModal && (
        <div className="modal-overlay" onClick={() => setShowExploreModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowExploreModal(false)}>✕</button>
            <h2>Explore Categories</h2>
            <div className="explore-grid">
              {categories.map(cat => (
                <div key={cat.id} className="explore-item" onClick={() => { setActiveCategory(cat.id); setShowExploreModal(false); setVisibleCourses(8); }}>
                  <img src={cat.image} alt={cat.name} className="explore-icon-img" />
                  <h3>{cat.name}</h3>
                  <p>{allCourses.filter(c => c.categoryId === cat.id).length} courses</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>SkillHub</h3>
              <ul>
                <li>About us</li>
                <li>Careers</li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Teach</h3>
              <ul>
                <li>Become an instructor</li>
                <li>Help and support</li>
              </ul>
            </div>
            <div className="footer-col">
              <h3>Company</h3>
              <ul>
                <li>Terms of use</li>
                <li>Privacy policy</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="language-selector">🌐 English</div>
            <p>© 2024 SkillHub, Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;