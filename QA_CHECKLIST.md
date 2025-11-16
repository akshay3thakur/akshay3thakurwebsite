# QA Checklist

Use this checklist to verify all features are working correctly.

## Navigation

- [ ] Top nav anchors work (Home, Experience, Projects, etc.)
- [ ] "Thoughts" nav item opens WordPress in new tab
- [ ] Current anchor highlighted on scroll
- [ ] Smooth scroll behavior works
- [ ] Mobile menu (if implemented) works

## Hero Section

- [ ] Profile image loads correctly
- [ ] Name and tagline display correctly
- [ ] Bio text is readable
- [ ] "Read my thoughts" button opens WordPress in new tab
- [ ] Week1/30/90 section is removed (replaced with "Read my thoughts")

## Experience Timeline

- [ ] All 4 experiences display correctly
- [ ] Company logos load (Mailmodo, Infigo Eye Care)
- [ ] Dates and roles are correct
- [ ] Problem → Impact format is clear
- [ ] Timeline line and dots render correctly
- [ ] Responsive layout works on mobile

## Projects

- [ ] All 4 projects display
- [ ] Project links open in new tab
- [ ] GitHub links work (WebShield Pro, Stationary Mart)
- [ ] Hover effects work
- [ ] Grid layout is responsive

## Skills

- [ ] Technical skills display correctly
- [ ] Soft skills display correctly
- [ ] Skill tags are readable
- [ ] Hover effects work

## Education

- [ ] VIT Chennai displays correctly
- [ ] CGPA shows as 8.16

## Achievements

- [ ] Samsung Metaverse Prism finalist displays
- [ ] State-level badminton displays
- [ ] Cards are readable

## Volunteering

- [ ] All 3 organizations display
- [ ] Logos load (PlaceXP, NexSeed)
- [ ] Roles and dates are correct
- [ ] Impact descriptions are clear

## Certifications

- [ ] Google Cloud Digital Leader displays
- [ ] AWS Cloud Practitioner displays
- [ ] "View Certificate" links open in new tab
- [ ] Hover reveals context text

## Quote of the Day

- [ ] Quote loads from API on page load
- [ ] Shows spinner while loading
- [ ] Displays quote in large italic text
- [ ] Author displays below quote
- [ ] Fallback quote ("Keep shipping." — Akshay) shows if API fails
- [ ] Fallback shows after 3s timeout
- [ ] Quote cached per session (no repeated calls)

## Smile Counter

- [ ] Count loads on page load (GET /api/smile/count)
- [ ] Shows "X smiles so far" or "Be the first!"
- [ ] Button is clickable
- [ ] On click:
  - [ ] Button disables immediately
  - [ ] POST /api/smile/increment is called
  - [ ] Confetti shows (if motion not reduced)
  - [ ] Success message: "You're the #X to smile today! 🎉"
  - [ ] Message shows for 3.5s
  - [ ] Updated count displays after message
- [ ] Error handling: Shows "Hmm — try again" on failure
- [ ] Error message shows for 2s
- [ ] Button re-enables after error
- [ ] Session storage prevents duplicate increments
- [ ] Button disabled after successful increment in same session

## Contact

- [ ] Email link uses mailto:akshay3thakur@gmail.com
- [ ] Subject is prefilled
- [ ] Toast notification appears on click
- [ ] Toast says: "I'll reply personally (snacks are serious business) ☕"
- [ ] Toast auto-dismisses after 3.5s
- [ ] Toast respects reduced motion
- [ ] Resume download link works
- [ ] Social links (GitHub, LinkedIn) work

## Footer

- [ ] "Read my thoughts" section displays
- [ ] "Go to blog" button opens WordPress in new tab
- [ ] Footer links work
- [ ] Copyright year is correct

## Right-side Progress Bar

- [ ] Vertical bar on right (desktop)
- [ ] Changes color per section (teal/amber)
- [ ] Smooth color transitions
- [ ] Progress updates on scroll
- [ ] Hidden on mobile (replaced with top bar)
- [ ] Top horizontal bar on mobile

## Accessibility

- [ ] All interactive elements have aria-label
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Color contrast meets WCAG AA
- [ ] Reduced motion is respected
- [ ] Focus indicators visible

## Responsive Design

- [ ] Mobile (375px): All sections readable, no horizontal scroll
- [ ] Tablet (768px): Layout adapts correctly
- [ ] Desktop (1920px): Full layout displays correctly
- [ ] Images scale appropriately
- [ ] Text remains readable at all sizes

## Performance

- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse Accessibility: 95+
- [ ] Lighthouse Best Practices: 90+
- [ ] Lighthouse SEO: 90+
- [ ] Images are optimized
- [ ] No console errors
- [ ] No network errors (except expected API calls)

## Error Handling

- [ ] Quote API failure: Shows fallback
- [ ] Smile count API failure: Shows 0 or handles gracefully
- [ ] Smile increment failure: Shows error message
- [ ] Network timeout: Handles gracefully
- [ ] Missing env var: Logs warning, uses fallbacks

## Browser Testing

- [ ] Chrome: All features work
- [ ] Firefox: All features work
- [ ] Safari: All features work
- [ ] Edge: All features work

## Network Logs (for API verification)

- [ ] GET /api/quote: 200 OK or handled fallback
- [ ] GET /api/smile/count: 200 OK with { "count": N }
- [ ] POST /api/smile/increment: 200 OK with { "count": N, "message": "..." }

## Notes

Document any issues found during testing:

1. 
2. 
3. 

---

**Testing Date**: _______________
**Tester**: _______________
**Environment**: Production / Staging
**Backend URL**: _______________

