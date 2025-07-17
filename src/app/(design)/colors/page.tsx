import React from "react";

const colorRamps = [
  {
    name: "Primary",
    key: "primary",
    shades: [50,100,200,300,400,500,600,700,800,900,950],
  },
  {
    name: "Purple",
    key: "purple",
    shades: [50,100,200,300,400,500,600,700,800,900,950],
  },
  {
    name: "Neutral",
    key: "neutral",
    shades: [50,100,200,300,400,500,600,700,800,900,950],
  },
  {
    name: "PinkRed",
    key: "pinkred",
    shades: [50,100,200,300,400,500,600,700,800,900,950],
  },
  {
    name: "Sky",
    key: "sky",
    shades: [50,100,200,300,400,500,600,700,800,900,950],
  },
  {
    name: "Green",
    key: "green",
    shades: [50,100,200,300,400,500,600,700,800,900,950],
  },
  {
    name: "Yellow",
    key: "yellow",
    shades: [50,100,200,300,400,500,600,700,800,900,950],
  },
  {
    name: "Lime",
    key: "lime",
    shades: [50,100,200,300,400,500,600,700,800,900,950],
  },
  {
    name: "Orange",
    key: "orange",
    shades: [50,100,200,300,400,500,600,700,800,900,950],
  },
  {
    name: "Blue",
    key: "blue",
    shades: [50,100,200,300,400,500,600,700,800,900,950],
  },
  {
    name: "Pink",
    key: "pink",
    shades: [50,100,200,300,400,500,600,700,800,900,950],
  },
  {
    name: "Brown",
    key: "brown",
    shades: [50,100,200,300,400,500,600,700,800,900,950],
  },
];

function getHex(color: string, shade: number) {
  // This function is for display only; in a real app, you might import the color map from your config
  const hexes: Record<string, Record<number, string>> = {
    primary: {50:'#F4F5FF',100:'#F0F2FE',200:'#EBEEFF',300:'#CAD1FC',400:'#A0ACF8',500:'#7D8BE6',600:'#2C24C3',700:'#272199',800:'#171273',900:'#15115E',950:'#090642'},
    neutral: {50:'#FFFFFF',100:'#F8F8F9',200:'#F3F3F5',300:'#EAEAEF',400:'#BAB9C3',500:'#A09FAA',600:'#7C7B87',700:'#605F6B',800:'#52515E',900:'#42414E',950:'#131221'},
    pinkred: {50:'#FFF4F6',100:'#FEE8EC',200:'#FCCAD3',300:'#F8A0B0',400:'#E67D90',500:'#E35770',600:'#E42E4F',700:'#BE1235',800:'#9F1234',900:'#881333',950:'#4C0516'},
    sky: {50:'#F4FCFF',100:'#E8F7FE',200:'#CAEDFC',300:'#A0DEF8',400:'#7DC7E6',500:'#2EADE4',600:'#128ABE',700:'#12759F',800:'#136588',900:'#0E4F6C',950:'#093348'},
    green: {50:'#E8FEF5',100:'#CAFCE8',200:'#A0F8D5',300:'#7DE6BC',400:'#2EE49B',500:'#12BE79',600:'#129F67',700:'#138859',800:'#0C6E47',900:'#054C30',950:'#022c20'},
    yellow: {50:'#FFF9EB',100:'#FFF5DB',200:'#FCE9BA',300:'#F6DB98',400:'#FBD263',500:'#F8BC1A',600:'#E4B02E',700:'#BE8F17',800:'#9D7717',900:'#82651A',950:'#473508'},
    lime: {50:'#F8FEF2',100:'#F5FFEB',200:'#EDFFDB',300:'#DBFCBA',400:'#C7F698',500:'#B5F673',600:'#89E42E',700:'#6BBE17',800:'#5A9D17',900:'#4E821A',950:'#284708'},
    orange: {50:'#FFF8F4',100:'#FFF5EF',200:'#FEF0E8',300:'#FCDCCA',400:'#F8C0A0',500:'#E6A37D',600:'#E4712E',700:'#BE5112',800:'#9F4612',900:'#883E13',950:'#4C1F05'},
    blue: {50:'#FAFEFF',100:'#E8FAFF',200:'#DBF7FF',300:'#BAECFC',400:'#98E0F6',500:'#73D7F6',600:'#2EBAE4',700:'#1797BE',800:'#177E9D',900:'#1A6A82',950:'#083847'},
    pink: {50:'#FEFAFD',100:'#FEF2F8',200:'#FFD8EE',300:'#FCBADA',400:'#F698CA',500:'#F673B9',600:'#E42E8F',700:'#BE1770',800:'#9D175E',900:'#821A51',950:'#47082A'},
    brown: {50:'#FEF8F2',100:'#FFF5EB',200:'#FFECD3',300:'#FCDABA',400:'#F6C598',500:'#F6B273',600:'#BE6817',700:'#9D5817',800:'#824C1A',900:'#69380A',950:'#472608'},
    purple: {50:'#F6F2FE',100:'#F2EBFF',200:'#E8DBFF',300:'#D1BAFC',400:'#B998F6',500:'#A173F6',600:'#6E2EE4',700:'#5117BE',800:'#46179D',900:'#3E1A82',950:'#1E0847'},
  };
  return hexes[color][shade];
}

export default function ColorsPage() {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Colors</h1>
      <div className="space-y-10">
        {colorRamps.map((ramp) => (
          <div key={ramp.key}>
            <div className="font-semibold mb-2">{ramp.name}</div>
            <div className="flex gap-2">
              {ramp.shades.map((shade) => {
                const hex = getHex(ramp.key, shade);
                return (
                  <div key={shade} className="flex flex-col items-center">
                    <div
                      className="w-16 h-10 rounded-lg border border-neutral-200 mb-1"
                      style={{ backgroundColor: hex }}
                    ></div>
                    <div className="text-xs text-neutral-500 font-mono">{shade}</div>
                    <div className="text-xs text-neutral-400 font-mono">{hex}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 