const fs = require('fs');
const filesToFix = [
  'src/components/meetings/room/MeetingLibrary.tsx',
  'src/data/mockMeetingContexts.ts',
  'src/data/mockMeetings.ts'
];
for(let f of filesToFix) {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/\bUpcoming\b/g, "'Upcoming'");
  // Also fix any double quotes if it became "'Upcoming'"
  content = content.replace(/''Upcoming''/g, "'Upcoming'");
  fs.writeFileSync(f, content);
}
