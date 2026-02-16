# Ultra-Premium Kindergarten SaaS — Style Guide

## 🎨 Design Philosophy

This kindergarten management system follows a **soft, playful, yet premium** design language that appeals to parents, teachers, and administrators while maintaining professional credibility.

---

## Color Palette

### Primary Colors
- **Primary Blue**: `#3b82f6` - Main brand color, used for CTAs and primary actions
- **Secondary Purple**: `#a855f7` - Accent color for highlights
- **Accent Pink**: `#ec4899` - Tertiary accent for visual interest

### Functional Colors
- **Success Green**: `#10b981` - Positive actions, attendance present
- **Warning Orange**: `#f97316` - Pending fees, alerts
- **Danger Red**: `#ef4444` - Errors, absent status
- **Info Cyan**: `#06b6d4` - Informational messages

### Pastel Backgrounds
- **Blue**: `#dbeafe`
- **Purple**: `#f3e8ff`
- **Pink**: `#fce7f3`
- **Green**: `#d1fae5`
- **Yellow**: `#fef3c7`
- **Orange**: `#fed7aa`

---

## Typography

### Font Family
- **Display & Body**: Inter (system-ui fallback)

### Font Sizes
```
xs:   0.75rem  (12px)
sm:   0.875rem (14px)
base: 1rem     (16px)
lg:   1.125rem (18px)
xl:   1.25rem  (20px)
2xl:  1.5rem   (24px)
3xl:  1.875rem (30px)
4xl:  2.25rem  (36px)
```

### Font Weights
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700

---

## Glassmorphism

The signature visual style of the application.

### CSS Implementation
```css
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}
```

### Usage
- All card components
- Modal dialogs
- Navigation bars
- Floating action buttons

---

## Gradients

### Primary Gradient
```css
background: linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%);
```
**Usage**: Headers, hero sections, premium CTAs

### Pastel Gradient
```css
background: linear-gradient(135deg, #dbeafe 0%, #f3e8ff 50%, #fce7f3 100%);
```
**Usage**: Page backgrounds

### Button Gradients
- **Success**: `linear-gradient(135deg, #10b981 0%, #34d399 100%)`
- **Warning**: `linear-gradient(135deg, #f97316 0%, #fb923c 100%)`

---

## Spacing System

```
xs:  0.25rem (4px)
sm:  0.5rem  (8px)
md:  1rem    (16px)
lg:  1.5rem  (24px)
xl:  2rem    (32px)
2xl: 3rem    (48px)
3xl: 4rem    (64px)
```

---

## Border Radius

```
sm:   0.5rem  (8px)
md:   0.75rem (12px)
lg:   1rem    (16px)
xl:   1.5rem  (24px)
2xl:  2rem    (32px)
full: 9999px  (circular)
```

**Standard**: Use `rounded-2xl` (2rem) for cards and containers

---

## Shadows

```css
sm:  0 1px 2px 0 rgba(0, 0, 0, 0.05)
md:  0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1)
2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

**Colored Shadows**: Add `/30` opacity to match element color
```css
shadow-lg shadow-primary/30
shadow-lg shadow-green-500/30
```

---

## Animations

### Duration
- **Fast**: 150ms - Micro-interactions
- **Normal**: 300ms - Standard transitions
- **Slow**: 500ms - Page transitions

### Easing
```css
default: cubic-bezier(0.4, 0, 0.2, 1)
```

### Common Patterns

**Fade In**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
```

**Staggered List**
```jsx
{items.map((item, idx) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: idx * 0.05 }}
  >
))}
```

**Hover Scale**
```css
hover:scale-[1.02] transition-transform
```

---

## Component Patterns

### Card Component
```jsx
<div className="glass-card p-6 rounded-2xl shadow-xl">
  {/* Content */}
</div>
```

### Status Badge
```jsx
<span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
  Paid
</span>
```

### Icon Container
```jsx
<div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
  <Icon className="w-5 h-5 text-blue-600" />
</div>
```

### Gradient Button
```jsx
<button className="bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary/30 hover:scale-[1.02] transition-all">
  Click Me
</button>
```

---

## Mobile-First Principles

1. **Touch Targets**: Minimum 44x44px for all interactive elements
2. **Spacing**: Generous padding (minimum 16px) for readability
3. **Typography**: Minimum 14px for body text
4. **Navigation**: Bottom tab bar for parent portal
5. **Gestures**: Swipe-friendly card layouts

---

## Accessibility

- **Contrast Ratios**: Minimum 4.5:1 for text
- **Focus States**: Visible outline on keyboard navigation
- **Alt Text**: All images have descriptive alt attributes
- **Semantic HTML**: Proper heading hierarchy

---

## Icon Usage

**Library**: Lucide React

**Sizes**:
- Small: `w-4 h-4` (16px)
- Medium: `w-5 h-5` (20px)
- Large: `w-6 h-6` (24px)

**Colors**: Match parent container or use semantic colors

---

## Do's and Don'ts

### ✅ Do
- Use glassmorphism for all cards
- Apply gradient backgrounds to headers
- Add micro-animations to interactions
- Maintain consistent border radius (2xl)
- Use pastel colors for backgrounds

### ❌ Don't
- Use harsh shadows or borders
- Mix multiple gradient styles
- Overuse animations (keep subtle)
- Use default gray backgrounds
- Ignore mobile responsiveness

---

## Example Implementations

### Attendance Card
```jsx
<div className="glass-card p-6 rounded-2xl shadow-xl">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
      <CalendarCheck className="w-5 h-5 text-green-600" />
    </div>
    <div>
      <p className="text-xs text-muted-foreground uppercase font-semibold">Attendance</p>
      <h3 className="text-lg font-bold">This Month</h3>
    </div>
  </div>
  <div className="grid grid-cols-3 gap-3">
    {/* Stats */}
  </div>
</div>
```

### Timeline Item
```jsx
<div className="relative pl-8 pb-4 border-l-2 border-gray-200">
  <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-yellow-100 border-2 border-white flex items-center justify-center shadow-md">
    <Star className="w-3 h-3 text-yellow-700" />
  </div>
  <div className="p-4 rounded-xl bg-yellow-100 border border-yellow-300">
    <h4 className="font-bold">Achievement Title</h4>
    <p className="text-sm">Description text</p>
  </div>
</div>
```

---

## Responsive Breakpoints

```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

**Mobile-First Approach**: Design for mobile, enhance for desktop

---

This style guide ensures consistency across all modules and maintains the premium, playful aesthetic of the kindergarten SaaS prototype.
