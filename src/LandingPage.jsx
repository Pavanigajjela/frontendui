import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

// Real image URLs (replace with your local images if downloaded)
const courseImages = {
  webDev: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=240&fit=crop",
  python: "https://images.unsplash.com/photo-1526379095098-d4fd4341c767?w=400&h=240&fit=crop",
  react: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=240&fit=crop",
  javascript: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=240&fit=crop",
  nodejs: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=240&fit=crop",
  flutter: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=240&fit=crop",
  marketing: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=240&fit=crop",
  business: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=240&fit=crop",
  datascience: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop",
  design: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop",
  photography: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=400&h=240&fit=crop",
  music: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=240&fit=crop",
  yoga: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=240&fit=crop"
};

const LandingPage = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
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
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const userName = localStorage.getItem('userName') || '';
  const userEmail = localStorage.getItem('userEmail') || '';

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedEnrolled = localStorage.getItem('enrolledCourses');
    if (savedEnrolled) setEnrolledCourses(JSON.parse(savedEnrolled));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const showMessage = (msg) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleAddToCart = (course, e) => {
    e.stopPropagation();
    
    if (!isLoggedIn) {
      showMessage('🔐 Please login to add items to cart');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    
    const existingItem = cart.find(item => item.id === course.id);
    if (existingItem) {
      showMessage(`⚠️ ${course.title} is already in your cart!`);
    } else {
      setCart([...cart, { ...course, quantity: 1 }]);
      showMessage(`✓ ${course.title} added to cart!`);
    }
  };

  const handleEnroll = (course, e) => {
    e.stopPropagation();
    
    if (!isLoggedIn) {
      showMessage('🔐 Please login to enroll in courses');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    
    if (enrolledCourses.find(c => c.id === course.id)) {
      showMessage(`⚠️ You are already enrolled in ${course.title}!`);
      return;
    }
    
    const updatedEnrolled = [...enrolledCourses, { ...course, enrolledAt: new Date().toISOString(), progress: 0 }];
    setEnrolledCourses(updatedEnrolled);
    localStorage.setItem('enrolledCourses', JSON.stringify(updatedEnrolled));
    
    const updatedCart = cart.filter(item => item.id !== course.id);
    setCart(updatedCart);
    
    showMessage(`🎉 Successfully enrolled in ${course.title}!`);
  };

  const handleRemoveFromCart = (courseId, e) => {
    e.stopPropagation();
    const updatedCart = cart.filter(item => item.id !== courseId);
    setCart(updatedCart);
    showMessage(`✓ Removed from cart`);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    showMessage('👋 Logged out successfully');
  };

  const categories = [
    { id: 'development', name: "Development", icon: "💻", color: "#4CAF50", description: "Learn programming and web development", image: courseImages.webDev },
    { id: 'business', name: "Business", icon: "📊", color: "#2196F3", description: "Master business strategy and leadership", image: courseImages.business },
    { id: 'finance', name: "Finance", icon: "💰", color: "#FF9800", description: "Understand finance and accounting", image: courseImages.business },
    { id: 'it', name: "IT & Software", icon: "🤖", color: "#9C27B0", description: "Explore IT and software development", image: courseImages.datascience },
    { id: 'design', name: "Design", icon: "🎨", color: "#E91E63", description: "Learn UI/UX and graphic design", image: courseImages.design },
    { id: 'marketing', name: "Marketing", icon: "📈", color: "#00BCD4", description: "Master digital marketing", image: courseImages.marketing },
    { id: 'photography', name: "Photography", icon: "📷", color: "#FF5722", description: "Improve photography skills", image: courseImages.photography },
    { id: 'music', name: "Music", icon: "🎵", color: "#9E9E9E", description: "Learn music production", image: courseImages.music },
    { id: 'health', name: "Health & Fitness", icon: "🧘", color: "#8BC34A", description: "Health and wellness courses", image: courseImages.yoga }
  ];

  const allCourses = [
    { id: 1, title: "The Complete Web Development Bootcamp", instructor: "Dr. Angela Yu", rating: 4.8, students: 456789, price: "₹3,499", oldPrice: "₹12,999", category: "Development", categoryId: "development", image: courseImages.webDev, bestseller: true, level: "Beginner", duration: "56 hrs", tags: ["web", "html", "css", "javascript"] },
    { id: 2, title: "100 Days of Code: Python Pro Bootcamp", instructor: "Dr. Angela Yu", rating: 4.9, students: 567890, price: "₹3,999", oldPrice: "₹14,999", category: "Development", categoryId: "development", image: courseImages.python, bestseller: true, level: "All Levels", duration: "65 hrs", tags: ["python", "programming"] },
    { id: 3, title: "React - The Complete Guide", instructor: "Maximilian S", rating: 4.7, students: 345678, price: "₹2,999", oldPrice: "₹9,999", category: "Development", categoryId: "development", image: courseImages.react, bestseller: false, level: "Intermediate", duration: "48 hrs", tags: ["react", "frontend"] },
    { id: 4, title: "JavaScript: Advanced Concepts", instructor: "Andrei Neagoie", rating: 4.8, students: 234567, price: "₹2,499", oldPrice: "₹7,999", category: "Development", categoryId: "development", image: courseImages.javascript, bestseller: false, level: "Advanced", duration: "32 hrs", tags: ["javascript"] },
    { id: 5, title: "Node.js, Express, MongoDB Bootcamp", instructor: "Jonas S", rating: 4.9, students: 198765, price: "₹3,499", oldPrice: "₹10,999", category: "Development", categoryId: "development", image: courseImages.nodejs, bestseller: true, level: "Intermediate", duration: "42 hrs", tags: ["nodejs", "backend"] },
    { id: 6, title: "Flutter & Dart - Complete Guide", instructor: "Maximilian S", rating: 4.8, students: 156789, price: "₹2,999", oldPrice: "₹8,999", category: "Development", categoryId: "development", image: courseImages.flutter, bestseller: false, level: "Beginner", duration: "38 hrs", tags: ["flutter", "mobile"] },
    { id: 7, title: "Complete Digital Marketing Course", instructor: "Rob Percival", rating: 4.6, students: 189654, price: "₹2,999", oldPrice: "₹8,999", category: "Business", categoryId: "business", image: courseImages.marketing, bestseller: true, level: "Beginner", duration: "28 hrs", tags: ["marketing", "digital"] },
    { id: 8, title: "Business Strategy Management", instructor: "Chris Croft", rating: 4.7, students: 98765, price: "₹2,499", oldPrice: "₹6,999", category: "Business", categoryId: "business", image: courseImages.business, bestseller: false, level: "Intermediate", duration: "22 hrs", tags: ["strategy", "business"] },
    { id: 9, title: "Data Science & ML Bootcamp", instructor: "Jose Portilla", rating: 4.8, students: 345678, price: "₹4,499", oldPrice: "₹15,999", category: "IT & Software", categoryId: "it", image: courseImages.datascience, bestseller: true, level: "Intermediate", duration: "52 hrs", tags: ["datascience", "ml"] },
    { id: 10, title: "UI/UX Design Bootcamp", instructor: "Joe Natoli", rating: 4.7, students: 143210, price: "₹2,999", oldPrice: "₹9,999", category: "Design", categoryId: "design", image: courseImages.design, bestseller: false, level: "All Levels", duration: "40 hrs", tags: ["uiux", "design"] },
    { id: 11, title: "Photography Masterclass", instructor: "Phil Ebiner", rating: 4.8, students: 234567, price: "₹2,999", oldPrice: "₹8,999", category: "Photography", categoryId: "photography", image: courseImages.photography, bestseller: true, level: "Beginner", duration: "28 hrs", tags: ["photography"] },
    { id: 12, title: "Music Production in Logic Pro X", instructor: "Tomas George", rating: 4.8, students: 87654, price: "₹3,499", oldPrice: "₹10,999", category: "Music", categoryId: "music", image: courseImages.music, bestseller: true, level: "Beginner", duration: "42 hrs", tags: ["music", "production"] },
    { id: 13, title: "Complete Yoga Certificate", instructor: "David Smith", rating: 4.7, students: 87654, price: "₹2,499", oldPrice: "₹6,999", category: "Health & Fitness", categoryId: "health", image: courseImages.yoga, bestseller: true, level: "All Levels", duration: "25 hrs", tags: ["yoga", "fitness"] }
  ];

  const getFilteredCourses = () => {
    let filtered = activeCategory === 'all' ? allCourses : allCourses.filter(course => course.categoryId === activeCategory);
    
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
    if (activeTab === 'popular') return [...courses].sort((a, b) => b.students - a.students).slice(0, 8);
    if (activeTab === 'top-rated') return [...courses].sort((a, b) => b.rating - a.rating).slice(0, 8);
    return courses.slice(0, 8);
  };

  const currentCategory = categories.find(cat => cat.id === activeCategory);
  const cartTotal = cart.reduce((sum, item) => sum + parseInt(item.price.replace(/[^0-9]/g, '')), 0);

  return (
    <div className="landing-page">
      {/* Notification Toast */}
      {showNotification && <div className="notification-toast">{notificationMsg}</div>}

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</div>
            <div className="logo" onClick={() => navigate('/')}>SkillHub</div>
            <div className="categories-dropdown" onClick={() => setShowCategoryMenu(!showCategoryMenu)}>
              <span className="categories-btn">{activeCategory === 'all' ? 'Explore ▼' : `${currentCategory?.icon} ${currentCategory?.name} ▼`}</span>
              {showCategoryMenu && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">Browse Categories</div>
                  <div className="dropdown-categories">
                    <div className="dropdown-category-item" onClick={() => { setActiveCategory('all'); setShowCategoryMenu(false); }}>
                      <span className="dropdown-icon">🎯</span>
                      <div><strong>All Categories</strong><small>{allCourses.length} courses</small></div>
                    </div>
                    {categories.map(cat => (
                      <div key={cat.id} className="dropdown-category-item" onClick={() => { setActiveCategory(cat.id); setShowCategoryMenu(false); setVisibleCourses(8); }}>
                        <span className="dropdown-icon">{cat.icon}</span>
                        <div><strong>{cat.name}</strong><small>{allCourses.filter(c => c.categoryId === cat.id).length} courses</small></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <form className="search-bar" onSubmit={(e) => { e.preventDefault(); showMessage(`🔍 Found ${filteredCourses.length} results`); }}>
            <input type="text" placeholder="Search for anything..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit" className="search-btn"></button>
          </form>
          
          <div className="nav-right">
            {isLoggedIn ? (
              <>
                <div className="user-menu">
                  <div className="user-avatar-small">{userName.charAt(0).toUpperCase()}</div>
                  <span className="user-name-nav">Hello, {userName.split(' ')[0]}</span>
                  <div className="user-dropdown">
                    <button className="dropdown-btn">▼</button>
                    <div className="dropdown-content">
                      <button onClick={() => navigate('/dashboard')}>📚 My Dashboard</button>
                      <button onClick={() => setShowCartModal(true)}>🛒 Cart ({cart.length})</button>
                      <button onClick={handleLogout}>🚪 Logout</button>
                    </div>
                  </div>
                </div>
                <button className="cart-icon" onClick={() => setShowCartModal(true)}>🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}</button>
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
        
        {isMenuOpen && (
          <div className="mobile-menu">
            {isLoggedIn ? (
              <>
                <button onClick={() => navigate('/dashboard')}>My Dashboard</button>
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

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-banner">
          <div className="hero-card">
            <h1>{isLoggedIn ? `Welcome back, ${userName}!` : 'Learn without limits'}</h1>
            <p>Choose from 200,000+ online video courses with new additions published every month</p>
            {!isLoggedIn && <button className="hero-cta" onClick={() => navigate('/login')}>Start Learning Today</button>}
          </div>
        </div>
      </div>

      {/* Category Banner */}
      {activeCategory !== 'all' && currentCategory && (
        <div className="category-banner" style={{ background: `linear-gradient(135deg, ${currentCategory.color}20 0%, ${currentCategory.color}40 100%)` }}>
          <div className="container">
            <div className="category-banner-content">
              <div className="category-banner-icon">{currentCategory.icon}</div>
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

      {/* Categories Bar */}
      <div className="categories-bar">
        <div className="categories-scroll">
          <span className={`category-item ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => { setActiveCategory('all'); setVisibleCourses(8); }}>
            All Categories
          </span>
          {categories.map(category => (
            <span key={category.id} className={`category-item ${activeCategory === category.id ? 'active' : ''}`} onClick={() => { setActiveCategory(category.id); setVisibleCourses(8); }}>
              {category.icon} {category.name}
            </span>
          ))}
        </div>
      </div>

      {/* Trusted Companies */}
      <div className="trusted-section">
        <div className="container">
          <p>Trusted by over 10,000+ companies worldwide</p>
          <div className="company-logos">
            <span>🏢 Google</span><span>🎨 Netflix</span><span>🐦 Twitter</span><span>📘 Facebook</span><span>💼 Microsoft</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {!searchQuery && (
        <div className="tabs-section">
          <div className="container">
            <div className="tabs">
              <button className={`tab-btn ${activeTab === 'popular' ? 'active' : ''}`} onClick={() => setActiveTab('popular')}>🔥 Most Popular</button>
              <button className={`tab-btn ${activeTab === 'top-rated' ? 'active' : ''}`} onClick={() => setActiveTab('top-rated')}>⭐ Top Rated</button>
            </div>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      <div className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>{searchQuery ? 'Search Results' : activeCategory === 'all' ? (activeTab === 'popular' ? 'Most Popular Courses' : 'Top Rated Courses') : `${currentCategory?.name} Courses`}</h2>
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
                    <button className="preview-btn" onClick={(e) => { e.stopPropagation(); setSelectedCourse(course); setShowPreviewModal(true); }}>Quick Preview</button>
                  </div>
                </div>
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p className="instructor">{course.instructor}</p>
                  <div className="rating"><span className="stars">★★★★★</span><span className="rating-value">{course.rating}</span><span className="students-count">({course.students.toLocaleString()})</span></div>
                  <div className="course-meta"><span className="level">{course.level}</span><span className="duration">{course.duration}</span></div>
                  <div className="price"><span className="current-price">{course.price}</span><span className="old-price">{course.oldPrice}</span></div>
                  <div className="course-actions">
                    {enrolledCourses.find(c => c.id === course.id) ? (
                      <button className="enrolled-btn" disabled>✓ Enrolled</button>
                    ) : (
                      <>
                        <button className="cart-btn-small" onClick={(e) => handleAddToCart(course, e)}>Add to Cart</button>
                        <button className="enroll-btn-small" onClick={(e) => handleEnroll(course, e)}>Enroll Now</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {hasMoreCourses && (
            <div className="load-more"><button className="load-more-btn" onClick={() => setVisibleCourses(prev => prev + 8)}>Load More Courses →</button></div>
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
                  <div className="category-highlight-icon" style={{ background: `${cat.color}20` }}>{cat.icon}</div>
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
            <div className="testimonial-card"><div className="testimonial-avatar">👩‍💻</div><div><div className="testimonial-stars">★★★★★</div><p>"The web development bootcamp changed my career!"</p><h4>Sarah Johnson</h4></div></div>
            <div className="testimonial-card"><div className="testimonial-avatar">👨‍💻</div><div><div className="testimonial-stars">★★★★★</div><p>"Best investment I ever made!"</p><h4>Michael Chen</h4></div></div>
          </div>
        </div>
      </div>

      {/* Instructor CTA */}
      <div className="instructor-section">
        <div className="container">
          <div className="instructor-content">
            <div><h2>Become an instructor</h2><p>Share your knowledge with millions of learners worldwide.</p><button className="instructor-btn" onClick={() => navigate('/login')}>Start teaching today</button></div>
            <div className="instructor-image"><div className="image-icon">👨‍🏫</div></div>
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      {showCartModal && (
        <div className="modal-overlay" onClick={() => setShowCartModal(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCartModal(false)}>✕</button>
            <h2>Your Cart ({cart.length} items)</h2>
            {cart.length === 0 ? (
              <div className="empty-cart"><p>Your cart is empty</p><button onClick={() => setShowCartModal(false)}>Continue Shopping</button></div>
            ) : (
              <>
                <div className="cart-items">{cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} />
                    <div><h4>{item.title}</h4><p>{item.instructor}</p><span>{item.price}</span></div>
                    <button onClick={(e) => handleRemoveFromCart(item.id, e)}>Remove</button>
                  </div>
                ))}</div>
                <div className="cart-total"><h3>Total: ₹{cartTotal.toLocaleString()}</h3><button className="checkout-btn">Proceed to Checkout</button></div>
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
            <div className="preview-stats"><span>⭐ {selectedCourse.rating}</span><span>👥 {selectedCourse.students.toLocaleString()}</span><span>📚 {selectedCourse.level}</span><span>⏱️ {selectedCourse.duration}</span></div>
            <div className="preview-price"><span className="current-price">{selectedCourse.price}</span><span className="old-price">{selectedCourse.oldPrice}</span></div>
            <div className="preview-actions">
              {enrolledCourses.find(c => c.id === selectedCourse.id) ? (
                <button className="enrolled-btn-large">✓ Already Enrolled</button>
              ) : (
                <>
                  <button className="preview-cart-btn" onClick={() => { handleAddToCart(selectedCourse, {}); setShowPreviewModal(false); }}>Add to Cart</button>
                  <button className="preview-enroll-btn" onClick={() => { handleEnroll(selectedCourse, {}); setShowPreviewModal(false); }}>Enroll Now</button>
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
                  <span className="explore-icon">{cat.icon}</span>
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
            <div className="footer-col"><h3>SkillHub</h3><ul><li>About us</li><li>Careers</li></ul></div>
            <div className="footer-col"><h3>Teach</h3><ul><li>Become an instructor</li><li>Help and support</li></ul></div>
            <div className="footer-col"><h3>Company</h3><ul><li>Terms of use</li><li>Privacy policy</li></ul></div>
          </div>
          <div className="footer-bottom"><div className="language-selector">🌐 English</div><p>© 2024 SkillHub, Inc.</p></div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;