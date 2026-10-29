/* =============================================================================
   FLEETWORK — SHARED CONFIG
   This file is the single source of truth for both index.html and roster.html.
   Edit the values below; every page that includes this file updates with them.
============================================================================= */
const TEAM = {
  tagline: "The premier men's league team in the South Bay — we play together, play hard defense, and do the little things that win games.",

  // The current season, shown on the home page scoreboard.
  season: { label: "Fall '26" },

  // Every division Fleetwork currently competes in.
  // Per division (all optional):
  //   record: "1–0"           the current win–loss record
  //   note: "5th in the standings"
  //   windowStart / windowEnd / playoffs   shown above the game list
  //   games: [ { date: "2026-10-25", time: "5:00 PM", opponent: "vs Team", venue: "Gym", result: "W 56–44" } ]
  //     date is year-month-day. Use "vs Team" for home and "@ Team" for away.
  //     Add result once a game is played; games are listed in date order.
  divisions: [
    {
      name: "Menlo Division A",
      record: "3–0",
      windowStart: "Oct 5",
      windowEnd: "Dec 7",
      playoffs: "Dec 14 & Dec 21",
      games: [
        { date: "2026-10-05", time: "9:00 PM", opponent: "vs Any Given Monday", venue: "Menlo Park, Court 1", result: "W 56–44" },
        { date: "2026-10-19", time: "7:00 PM", opponent: "@ Hometown Heroes", venue: "Menlo Park, Court 1", result: "W" },
        { date: "2026-10-26", time: "8:00 PM", opponent: "vs Blaze Force West", venue: "Menlo Park, Court 1", result: "W" },
        { date: "2026-11-02", time: "8:00 PM", opponent: "@ Fiddler Crabs", venue: "Menlo Park, Court 2" },
        { date: "2026-11-09", time: "7:00 PM", opponent: "vs iOS3", venue: "Menlo Park, Court 2" },
        { date: "2026-11-16", time: "7:00 PM", opponent: "@ Bay Club Bros", venue: "Menlo Park, Court 2" },
        { date: "2026-11-30", time: "7:00 PM", opponent: "vs Rim Reapers", venue: "Menlo Park, Court 2" },
        { date: "2026-12-07", time: "8:00 PM", opponent: "@ Sapa Boys", venue: "Menlo Park, Court 1" }
      ]
    },
    {
      name: "Majestic D1 Division",
      record: "0–2",
      games: [
        { date: "2026-10-25", time: "5:00 PM", opponent: "@ Out The Net", venue: "The Grove CC", result: "L" },
        { date: "2026-11-01", time: "6:00 PM", opponent: "vs Lockdown Elite", venue: "The Grove CC" },
        { date: "2026-11-08", time: "5:00 PM", opponent: "@ Misfits 1", venue: "The Grove CC" },
        { date: "2026-11-15", time: "4:00 PM", opponent: "@ Out of Shape", venue: "The Grove CC" },
        { date: "2026-11-22", time: "4:00 PM", opponent: "vs Calabreezees", venue: "The Grove CC" }
      ]
    },
    {
      name: "Southbay Hoops 35+ Division",
      record: "1–3",
      windowStart: "Sep 23",
      windowEnd: "Nov 18",
      playoffs: "Nov 25 & Dec 2",
      games: [
        { date: "2026-11-18", time: "8:00 PM", opponent: "vs AIM", venue: "Oak Grove Aux Gym" }
      ]
    }
  ],

  // One whole-team roster. Each player lists every division they suit up for —
  // add or remove names from `divisions` as that changes. `photo` (optional)
  // points to a file directly in assets/ (e.g. "nick" -> assets/nick.jpg);
  // leave it off for a number-only avatar.
  roster: [
    { photo: "nick", num: "22", name: "Nick Snyder", ht: `5'11"`, divisions: ["Menlo Division A", "Majestic D1 Division"] },
    { photo: "masa", num: "—", name: "Masa", ht: `6'5"`, divisions: ["Menlo Division A"] },
    { photo: "jan", num: "42", name: "Jan Van der Kooij", ht: `6'7"`, divisions: ["Menlo Division A"] },
    // Real jersey shows #41 — added since he had no number on record yet.
    { photo: "terence", num: "41", name: "Terence Pellum", ht: `6'7"`, divisions: ["Menlo Division A"] },
    { photo: "matt", num: "23", name: "Matt Mcandrews", ht: `6'0"`, divisions: ["Menlo Division A", "Majestic D1 Division"] },
    { photo: "alex", num: "—", name: "Alex Manu", ht: `6'0"`, divisions: ["Menlo Division A"] },
    { photo: "jc", num: "20", name: "JC", ht: `6'1"`, divisions: ["Menlo Division A", "Majestic D1 Division", "Southbay Hoops 35+ Division"] },
    { photo: "destry", num: "—", name: "Destry", ht: `6'2"`, divisions: ["Menlo Division A", "Majestic D1 Division"] },
    // Sage's #23 is confirmed by his real jersey — same number as Matt Mcandrews.
    // Flagging the duplicate rather than picking one to change; let me know if it should.
    { photo: "sage", num: "23", name: "Sage", ht: `6'5"`, divisions: ["Menlo Division A", "Majestic D1 Division"] },
    { num: "—", name: "Sway", ht: `6'5"`, divisions: ["Menlo Division A"] },
    { photo: "rizzo", num: "8", name: "Rizzo Dumlao", ht: `5'8"`, divisions: ["Majestic D1 Division", "Southbay Hoops 35+ Division"] },
    // Photo shows #23 on an alternate black jersey — kept the #15 already on file
    // since that's what was recorded earlier; flagged in case it should change.
    { photo: "dre", num: "15", name: "Andre Hayes", ht: `6'4"`, divisions: ["Southbay Hoops 35+ Division", "Majestic D1 Division"] },
    { photo: "ansley", num: "33", name: "Ansley", ht: `6'3"`, divisions: ["Majestic D1 Division"] },
    { num: "—", name: "City", ht: "—", divisions: ["Majestic D1 Division"] },
    { photo: "pat", num: "45", name: "Pat", ht: `6'5"`, divisions: ["Majestic D1 Division"] },
    { num: "—", name: "Josh D", ht: `6'3"`, divisions: ["Menlo Division A", "Majestic D1 Division", "Southbay Hoops 35+ Division"] },
    { photo: "darrell", num: "24", name: "Darrell (Popp)", ht: `5'11"`, divisions: ["Menlo Division A", "Majestic D1 Division"] },
    // Stu: height and division(s) still to be added.
    { photo: "stu", num: "31", name: "Stu", ht: "—", divisions: [] },
    { photo: "zack", num: "38", name: "Zack", ht: `6'2"`, divisions: ["Southbay Hoops 35+ Division"] },
    { num: "77", name: "Jesse", ht: `6'2"`, divisions: ["Southbay Hoops 35+ Division", "Majestic D1 Division"] },
    { num: "2", name: "Ed", ht: `5'7"`, divisions: ["Southbay Hoops 35+ Division"] },
    { num: "10", name: "Tuan", ht: `5'10"`, divisions: ["Southbay Hoops 35+ Division"] },
    { num: "9", name: "Janssen", ht: `5'11"`, divisions: ["Southbay Hoops 35+ Division"] },
    { num: "24", name: "Ray", ht: `5'10"`, divisions: ["Southbay Hoops 35+ Division"] },
    { num: "23", name: "Daniel", ht: `5'7"`, divisions: ["Southbay Hoops 35+ Division"] }
  ],

  // Phrases for the scrolling banner under the hero.
  ticker: ["Play together", "Play hard defense", "Do the little things", "Win as a team", "Premier men's league team"],

  openRuns: {
    intro: "Before the season tips off, and on open weeks during it, we run an open gym — no tryout, no pressure, just get on the floor with the squad.",
    when: "Usually a Wednesday night, confirmed a week out. Watch this page and our socials.",
    where: "We post the gym as soon as it's booked.",
    bring: ["Indoor court shoes", "Something to sweat in", "Water", "A few bucks if there's a gym fee"]
  },

  // Team staff — shown on roster.html.
  staff: [
    { role: "Team Manager", name: "Matthew" }
  ],

  // Highlights. Add one line per clip, in either format:
  //   { caption: "Game-winner vs Ohana", video: "assets/clip1.mp4", poster: "assets/clip1.jpg" }  (a video file in the repo)
  //   { caption: "Game-winner vs Ohana", url: "https://www.youtube.com/watch?v=XXXX" }            (opens the link)
  highlights: [],

  // Instagram carousel: paste specific POST urls here (not the profile URL) to have them
  // render live via Instagram's own embed — e.g. "https://www.instagram.com/p/XXXXXXXXXXX/".
  // Instagram doesn't let a static site auto-pull a whole profile feed without their API
  // and a server to hold the access token, so this is the closest no-backend equivalent:
  // real, live, official embeds — you just add the post link when you publish one.
  instagramPosts: [
    "https://www.instagram.com/p/DbU6epixxAy/",
    "https://www.instagram.com/p/DX0uiw0po-b/",
    "https://www.instagram.com/p/DX0t6CkJE88/",
    "https://www.instagram.com/p/DdC3ku0x7Au/",
    "https://www.instagram.com/p/DcY9UuTRNUQ/",
    "https://www.instagram.com/p/DbLpx0xxFob/",
    "https://www.instagram.com/p/Da3VgX7PH4G/"
  ],
  instagramProfile: "https://instagram.com/fleetworkbasketball",

  socials: {
    instagram: "https://instagram.com/fleetworkbasketball",
    tiktok: "",
    youtube: ""
  },

  contactEmail: "" // e.g. "fleetwork@example.com"
};
