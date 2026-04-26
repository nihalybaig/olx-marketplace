import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  { id: "all", name: "All", icon: "🏷️" },
  { id: "cars", name: "Cars", icon: "🚗" },
  { id: "mobiles", name: "Mobiles", icon: "📱" },
  { id: "electronics", name: "Electronics", icon: "💻" },
  { id: "furniture", name: "Furniture", icon: "🪑" },
  { id: "fashion", name: "Fashion", icon: "👕" },
  { id: "bikes", name: "Bikes", icon: "🏍️" },
  { id: "books", name: "Books", icon: "📚" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "pets", name: "Pets", icon: "🐾" },
];

const LISTINGS = [
  { id: 1, title: "iPhone 15 Pro Max 256GB", price: 89999, category: "mobiles", location: "Hyderabad, Banjara Hills", time: "2 hours ago", featured: true, images: 4, condition: "Like New", seller: "Rahul M.", verified: true },
  { id: 2, title: "Royal Enfield Classic 350", price: 145000, category: "bikes", location: "Hyderabad, Madhapur", time: "5 hours ago", featured: false, images: 6, condition: "Good", seller: "Vikram S.", verified: true },
  { id: 3, title: 'Samsung 55" 4K Smart TV', price: 32000, category: "electronics", location: "Hyderabad, Kukatpally", time: "1 day ago", featured: true, images: 3, condition: "Excellent", seller: "Priya K.", verified: false },
  { id: 4, title: "Wooden Dining Table 6 Seater", price: 18500, category: "furniture", location: "Hyderabad, Gachibowli", time: "3 hours ago", featured: false, images: 5, condition: "Good", seller: "Anand R.", verified: true },
  { id: 5, title: "Maruti Swift VXI 2020", price: 595000, category: "cars", location: "Hyderabad, Jubilee Hills", time: "6 hours ago", featured: true, images: 8, condition: "Excellent", seller: "Deepak T.", verified: true },
  { id: 6, title: "Nike Air Jordan 1 Retro", price: 8999, category: "fashion", location: "Hyderabad, Ameerpet", time: "1 day ago", featured: false, images: 3, condition: "Brand New", seller: "Sneha P.", verified: false },
  { id: 7, title: "MacBook Air M2 2023", price: 72000, category: "electronics", location: "Hyderabad, Hitech City", time: "4 hours ago", featured: true, images: 4, condition: "Like New", seller: "Karthik V.", verified: true },
  { id: 8, title: "German Shepherd Puppy", price: 15000, category: "pets", location: "Hyderabad, Secunderabad", time: "8 hours ago", featured: false, images: 5, condition: "N/A", seller: "Meera J.", verified: true },
  { id: 9, title: "Honda City V CVT 2021", price: 1050000, category: "cars", location: "Hyderabad, Kondapur", time: "2 days ago", featured: false, images: 7, condition: "Excellent", seller: "Suresh N.", verified: true },
  { id: 10, title: "IKEA L-Shape Sofa", price: 24000, category: "furniture", location: "Hyderabad, Miyapur", time: "12 hours ago", featured: false, images: 4, condition: "Good", seller: "Arjun D.", verified: false },
  { id: 11, title: "Cricket Kit Full Set", price: 4500, category: "sports", location: "Hyderabad, Dilsukhnagar", time: "1 day ago", featured: false, images: 3, condition: "Good", seller: "Rohit B.", verified: false },
  { id: 12, title: "Samsung Galaxy S24 Ultra", price: 74999, category: "mobiles", location: "Hyderabad, LB Nagar", time: "3 hours ago", featured: true, images: 5, condition: "Brand New", seller: "Aisha F.", verified: true },
  { id: 13, title: "Harry Potter Complete Box Set", price: 2200, category: "books", location: "Hyderabad, Begumpet", time: "2 days ago", featured: false, images: 2, condition: "Good", seller: "Nisha G.", verified: false },
  { id: 14, title: "PlayStation 5 + 2 Controllers", price: 38000, category: "electronics", location: "Hyderabad, Tarnaka", time: "7 hours ago", featured: false, images: 4, condition: "Like New", seller: "Ravi K.", verified: true },
  { id: 15, title: "Bajaj Pulsar NS200", price: 95000, category: "bikes", location: "Hyderabad, Uppal", time: "1 day ago", featured: false, images: 5, condition: "Good", seller: "Manoj P.", verified: true },
  { id: 16, title: "Levi's Denim Jacket", price: 1800, category: "fashion", location: "Hyderabad, Himayatnagar", time: "5 hours ago", featured: false, images: 3, condition: "Like New", seller: "Kavya S.", verified: false },
];

const PLACEHOLDER_COLORS = [
  "#E8F5E9", "#FFF3E0", "#E3F2FD", "#FCE4EC", "#F3E5F5",
  "#E0F7FA", "#FFF8E1", "#EDE7F6", "#E8EAF6", "#FBE9E7",
];

function formatPrice(p) {
  if (p >= 100000) return `₹${(p / 100000).toFixed(p % 100000 === 0 ? 0 : 1)} lakh`;
  return `₹${p.toLocaleString("en-IN")}`;
}

function PlaceholderImage({ title, index, size = "card" }) {
  const color = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length];
  const emoji = CATEGORIES.find(c => {
    const item = LISTINGS.find(l => l.title === title);
    return item && c.id === item.category;
  })?.icon || "📦";
  return (
    <div style={{
      width: "100%", height: size === "detail" ? 300 : 180,
      background: `linear-gradient(135deg, ${color}, ${color}dd)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size === "detail" ? 64 : 40,
    }}>{emoji}</div>
  );
}

function HomeScreen({ onNavigate, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }) {
  const filtered = LISTINGS.filter(l =>
    (selectedCategory === "all" || l.category === selectedCategory) &&
    (searchQuery === "" || l.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const featured = filtered.filter(f => f.featured);
  const regular = filtered.filter(f => !f.featured);
  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ padding: "12px 16px", position: "sticky", top: 56, zIndex: 10, background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#f5f5f5", borderRadius: 10, padding: "10px 14px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search cars, mobiles, and more..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ border: "none", background: "transparent", outline: "none", flex: 1, fontSize: 15, color: "#333", fontFamily: "'DM Sans', sans-serif" }} />
          {searchQuery && <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 18, color: "#999" }}>×</button>}
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, padding: "12px 16px", overflowX: "auto", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            padding: "8px 14px", borderRadius: 12, border: "none", cursor: "pointer",
            background: selectedCategory === cat.id ? "#002f34" : "#f5f5f5",
            color: selectedCategory === cat.id ? "#fff" : "#555",
            fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
            whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.2s ease",
          }}><span style={{ fontSize: 20 }}>{cat.icon}</span>{cat.name}</button>
        ))}
      </div>
      {featured.length > 0 && searchQuery === "" && selectedCategory === "all" && (
        <div style={{ padding: "8px 16px 4px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#002f34", margin: "0 0 12px" }}>✨ Featured</h2>
          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
            {featured.slice(0, 5).map((item, idx) => (
              <div key={item.id} onClick={() => onNavigate("detail", item)} style={{ minWidth: 220, borderRadius: 14, overflow: "hidden", cursor: "pointer", background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "1px solid #f0f0f0", flexShrink: 0 }}>
                <div style={{ position: "relative" }}>
                  <PlaceholderImage title={item.title} index={idx} />
                  <span style={{ position: "absolute", top: 8, left: 8, background: "#ffce32", color: "#002f34", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6, fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.5, textTransform: "uppercase" }}>FEATURED</span>
                  <span style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 11, padding: "2px 6px", borderRadius: 4 }}>📷 {item.images}</span>
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 18, color: "#002f34", margin: 0 }}>{formatPrice(item.price)}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#555", margin: "4px 0 0", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#999", margin: "6px 0 0" }}>📍 {item.location.split(",")[1]?.trim()} · {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ padding: "12px 16px 0" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#002f34", margin: "0 0 12px" }}>
          {selectedCategory === "all" ? "Fresh Recommendations" : CATEGORIES.find(c => c.id === selectedCategory)?.name}
        </h2>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: "#999", fontFamily: "'DM Sans', sans-serif" }}>
            <p style={{ fontSize: 40, margin: 0 }}>🔍</p>
            <p style={{ fontSize: 15, margin: "8px 0 0" }}>No listings found</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {(selectedCategory === "all" && searchQuery === "" ? regular : filtered).map((item, idx) => (
              <div key={item.id} onClick={() => onNavigate("detail", item)} style={{ borderRadius: 12, overflow: "hidden", cursor: "pointer", background: "#fff", border: "1px solid #eee" }}>
                <div style={{ position: "relative" }}>
                  <PlaceholderImage title={item.title} index={idx + 5} />
                  {item.featured && <span style={{ position: "absolute", top: 6, left: 6, background: "#ffce32", color: "#002f34", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, fontFamily: "'DM Sans', sans-serif" }}>FEATURED</span>}
                </div>
                <div style={{ padding: "8px 10px 10px" }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 16, color: "#002f34", margin: 0 }}>{formatPrice(item.price)}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#555", margin: "3px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.3 }}>{item.title}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}><span style={{ fontSize: 10, color: "#999", fontFamily: "'DM Sans', sans-serif" }}>📍 {item.location.split(",")[1]?.trim()}</span></div>
                  <span style={{ fontSize: 10, color: "#bbb", fontFamily: "'DM Sans', sans-serif" }}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DetailScreen({ item, onBack }) {
  const [liked, setLiked] = useState(false);
  if (!item) return null;
  return (
    <div style={{ paddingBottom: 90, background: "#fff" }}>
      <div style={{ position: "relative" }}>
        <PlaceholderImage title={item.title} index={item.id} size="detail" />
        <button onClick={onBack} style={{ position: "absolute", top: 12, left: 12, width: 36, height: 36, borderRadius: 18, background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <button onClick={() => setLiked(!liked)} style={{ position: "absolute", top: 12, right: 12, width: 36, height: 36, borderRadius: 18, background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "#ff4444" : "none"} stroke={liked ? "#ff4444" : "#333"} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <span style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.6)", color: "#fff", fontSize: 12, padding: "4px 10px", borderRadius: 6 }}>📷 1/{item.images}</span>
        {item.featured && <span style={{ position: "absolute", bottom: 12, left: 12, background: "#ffce32", color: "#002f34", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 6, fontFamily: "'DM Sans', sans-serif" }}>⭐ FEATURED</span>}
      </div>
      <div style={{ padding: "16px 16px 0" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 26, color: "#002f34", margin: 0 }}>{formatPrice(item.price)}</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#444", margin: "6px 0 0", lineHeight: 1.4 }}>{item.title}</p>
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          {item.condition !== "N/A" && <span style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, background: "#e8f5e9", color: "#2e7d32", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{item.condition}</span>}
          <span style={{ fontSize: 12, padding: "4px 10px", borderRadius: 6, background: "#f5f5f5", color: "#666", fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{CATEGORIES.find(c => c.id === item.category)?.name}</span>
        </div>
      </div>
      <div style={{ height: 8, background: "#f5f5f5", margin: "16px 0" }} />
      <div style={{ padding: "0 16px" }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: "#002f34", margin: "0 0 8px" }}>Posted in</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#555", margin: 0 }}>📍 {item.location}</p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#999", margin: "4px 0 0" }}>{item.time}</p>
      </div>
      <div style={{ height: 8, background: "#f5f5f5", margin: "16px 0" }} />
      <div style={{ padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: 24, background: "#e0f2f1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#00695c", fontFamily: "'DM Sans', sans-serif" }}>{item.seller[0]}</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#002f34" }}>{item.seller}</span>
              {item.verified && <svg width="16" height="16" viewBox="0 0 24 24" fill="#23e5db" stroke="#002f34" strokeWidth="1.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>}
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#999", margin: "2px 0 0" }}>Member since 2023</p>
          </div>
          <svg style={{ marginLeft: "auto" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>
      <div style={{ height: 8, background: "#f5f5f5", margin: "16px 0" }} />
      <div style={{ padding: "0 16px" }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: "#002f34", margin: "0 0 8px" }}>Description</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#555", margin: 0, lineHeight: 1.6 }}>
          {item.condition !== "N/A" ? `${item.title} in ${item.condition.toLowerCase()} condition. Well maintained and ready for use. Genuine buyers only. Price is slightly negotiable. Contact for more details.` : `${item.title}. Healthy and well taken care of. Contact for more details and viewing.`}
        </p>
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 16px", background: "#fff", borderTop: "1px solid #eee", display: "flex", gap: 10, zIndex: 20, maxWidth: 480, margin: "0 auto" }}>
        <button style={{ flex: 1, padding: "14px 0", borderRadius: 10, border: "2px solid #002f34", background: "#fff", color: "#002f34", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>💬 Chat</button>
        <button style={{ flex: 1, padding: "14px 0", borderRadius: 10, border: "none", background: "#002f34", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>📞 Call</button>
      </div>
    </div>
  );
}

function SellScreen({ onNavigate }) {
  const [form, setForm] = useState({ title: "", price: "", category: "mobiles", condition: "Good", description: "", location: "Hyderabad" });
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#002f34", margin: "0 0 8px" }}>Ad Posted!</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#777", margin: "0 0 24px" }}>Your ad is now live and visible to buyers.</p>
        <button onClick={() => { setSubmitted(false); setForm({ title: "", price: "", category: "mobiles", condition: "Good", description: "", location: "Hyderabad" }); onNavigate("home"); }} style={{ padding: "12px 32px", borderRadius: 10, border: "none", background: "#002f34", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Go to Home</button>
      </div>
    );
  }
  const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 10, border: "1.5px solid #e0e0e0", fontSize: 15, fontFamily: "'DM Sans', sans-serif", color: "#333", outline: "none", background: "#fafafa", boxSizing: "border-box", transition: "border-color 0.2s" };
  const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 6, display: "block" };
  return (
    <div style={{ padding: "16px 16px 100px" }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#002f34", margin: "0 0 20px" }}>Post your ad</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div><label style={labelStyle}>Ad Title *</label><input style={inputStyle} placeholder="e.g. iPhone 15 Pro Max 256GB" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
        <div><label style={labelStyle}>Category *</label><select style={{ ...inputStyle, appearance: "auto" }} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>{CATEGORIES.filter(c => c.id !== "all").map(c => (<option key={c.id} value={c.id}>{c.icon} {c.name}</option>))}</select></div>
        <div><label style={labelStyle}>Condition</label><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{["Brand New", "Like New", "Good", "Fair"].map(c => (<button key={c} onClick={() => setForm({ ...form, condition: c })} style={{ padding: "8px 16px", borderRadius: 8, border: form.condition === c ? "2px solid #002f34" : "1.5px solid #e0e0e0", background: form.condition === c ? "#e0f2f1" : "#fafafa", color: form.condition === c ? "#002f34" : "#666", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>{c}</button>))}</div></div>
        <div><label style={labelStyle}>Price (₹) *</label><input style={inputStyle} type="number" placeholder="e.g. 25000" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
        <div><label style={labelStyle}>Location</label><input style={inputStyle} placeholder="e.g. Hyderabad, Banjara Hills" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
        <div><label style={labelStyle}>Description</label><textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} placeholder="Describe your item in detail..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
        <div><label style={labelStyle}>Photos</label><div style={{ border: "2px dashed #ddd", borderRadius: 12, padding: 24, textAlign: "center", background: "#fafafa", cursor: "pointer" }}><p style={{ fontSize: 32, margin: "0 0 4px" }}>📷</p><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#888", margin: 0 }}>Tap to add photos</p><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#bbb", margin: "4px 0 0" }}>Add up to 12 photos</p></div></div>
        <button onClick={() => form.title && form.price && setSubmitted(true)} style={{ padding: "14px 0", borderRadius: 12, border: "none", background: form.title && form.price ? "#002f34" : "#ccc", color: "#fff", fontSize: 16, fontWeight: 700, cursor: form.title && form.price ? "pointer" : "default", fontFamily: "'DM Sans', sans-serif", marginTop: 8 }}>Post Now</button>
      </div>
    </div>
  );
}

function MyAdsScreen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: 32, textAlign: "center" }}>
      <div style={{ fontSize: 56, marginBottom: 12 }}>📋</div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#002f34", margin: "0 0 8px" }}>My Ads</h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#888", margin: 0, maxWidth: 260 }}>Your posted ads will appear here. Start selling to see them!</p>
    </div>
  );
}

function AccountScreen() {
  const items = [
    { icon: "👤", label: "Edit Profile" },
    { icon: "📦", label: "My Orders" },
    { icon: "❤️", label: "Favourites" },
    { icon: "⚙️", label: "Settings" },
    { icon: "🛡️", label: "Safety Tips" },
    { icon: "❓", label: "Help & Support" },
  ];
  return (
    <div style={{ padding: "16px 16px 100px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, borderRadius: 14, background: "linear-gradient(135deg, #002f34, #004d54)", marginBottom: 20 }}>
        <div style={{ width: 56, height: 56, borderRadius: 28, background: "#23e5db", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#002f34", fontFamily: "'DM Sans', sans-serif" }}>N</div>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: "#fff", margin: 0 }}>Nihal</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#23e5db", margin: "2px 0 0" }}>View and edit profile →</p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 4px", borderBottom: i < items.length - 1 ? "1px solid #f0f0f0" : "none", cursor: "pointer" }}>
            <span style={{ fontSize: 20 }}>{item.icon}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#333", fontWeight: 500 }}>{item.label}</span>
            <svg style={{ marginLeft: "auto" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [detailItem, setDetailItem] = useState(null);
  const [tab, setTab] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = (target, item) => {
    if (target === "detail") { setDetailItem(item); setScreen("detail"); } else { setScreen(target); setTab(target); }
    window.scrollTo(0, 0);
  };
  const tabs = [
    { id: "home", label: "Home", icon: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#002f34" : "none"} stroke={active ? "#002f34" : "#999"} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { id: "myads", label: "My Ads", icon: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#002f34" : "#999"} strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> },
    { id: "sell", label: "Sell", icon: () => null, isSell: true },
    { id: "chats", label: "Chats", icon: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#002f34" : "#999"} strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
    { id: "account", label: "Account", icon: (active) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#002f34" : "#999"} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
  ];
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", position: "relative", boxShadow: "0 0 40px rgba(0,0,0,0.05)" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      {screen !== "detail" && (
        <div style={{ position: "sticky", top: 0, zIndex: 20, background: "#fff", padding: "12px 16px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#002f34", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#23e5db" }}>M</div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#002f34" }}>Marketplace</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ width: 36, height: 36, borderRadius: 18, border: "1.5px solid #eee", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
          </div>
        </div>
      )}
      {screen === "home" && <HomeScreen onNavigate={navigate} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
      {screen === "detail" && <DetailScreen item={detailItem} onBack={() => { setScreen("home"); setTab("home"); }} />}
      {screen === "sell" && <SellScreen onNavigate={navigate} />}
      {screen === "myads" && <MyAdsScreen />}
      {screen === "chats" && <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: 32, textAlign: "center" }}><div style={{ fontSize: 56, marginBottom: 12 }}>💬</div><h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#002f34", margin: "0 0 8px" }}>Chats</h2><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#888", margin: 0 }}>No conversations yet</p></div>}
      {screen === "account" && <AccountScreen />}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#fff", borderTop: "1px solid #eee", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "6px 0 env(safe-area-inset-bottom, 8px)", zIndex: 30 }}>
        {tabs.map(t => {
          if (t.isSell) return (
            <button key={t.id} onClick={() => navigate("sell")} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: -20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 26, background: "#002f34", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,47,52,0.3)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: "#002f34", fontFamily: "'DM Sans', sans-serif" }}>Sell</span>
            </button>
          );
          const active = tab === t.id && screen !== "detail";
          return (
            <button key={t.id} onClick={() => navigate(t.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "none", border: "none", cursor: "pointer", padding: "4px 12px" }}>
              {t.icon(active)}
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? "#002f34" : "#999", fontFamily: "'DM Sans', sans-serif" }}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}