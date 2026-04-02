/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Download, FileText, Printer, Save } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface LogEntry {
  period: string;
  gradeSubject: string;
  competency: string;
  learningOutcomes: string;
  learningAids: string;
  methodology: string;
  assessment: string;
  other: string;
}

const LOG_DATA: LogEntry[] = [
  {
    period: "1",
    gradeSubject: "12-D රසායන විද්‍යාව",
    competency: "පදාර්ථයේ සංයුතිය ප්‍රකාශ කිරීමේ විවිධ ක්‍රම හඳුනා ගනී.",
    learningOutcomes: "ppt, ppm, ppb සාන්ද්‍රණ ඒකක භාවිතයෙන් ගණනය කිරීම් සිදු කරයි.",
    learningAids: "සම්පත් පොත, ගණක රාමුව, ප්‍රස්ථාර",
    methodology: "සාන්ද්‍රණ ඒකක අතර සම්බන්ධතාවය පැහැදිලි කිරීම සහ ගැටළු විසඳීම.",
    assessment: "පසුගිය විභාග ප්‍රශ්න සහ සිද්ධාන්තමය ගැටළු ලබා දී පිළිතුරු පරීක්ෂා කිරීම.",
    other: "-"
  },
  {
    period: "2",
    gradeSubject: "11-D විද්‍යාව",
    competency: "මිශ්‍රණවල ස්වභාවය සහ ඒවායේ සංරචක වෙන් කරගැනීමේ ක්‍රම ගවේෂණය කරයි.",
    learningOutcomes: "මිශ්‍රණ වර්ගීකරණය කර ඒවායේ ලක්ෂණ විස්තර කරයි.",
    learningAids: "පෙළ පොත, රූප සටහන්, පරීක්ෂණ කට්ටල",
    methodology: "සමජාතීය සහ විෂමජාතීය මිශ්‍රණ පිළිබඳ ප්‍රායෝගික ක්‍රියාකාරකම් සිදු කිරීම.",
    assessment: "සිසුන්ගෙන් ප්‍රශ්න ඇසීම සහ කෙටි සටහන් පරීක්ෂා කිරීම.",
    other: "-"
  },
  {
    period: "3",
    gradeSubject: "10-C විද්‍යාව",
    competency: "සරල රේඛීය චලිතය විස්තර කිරීම සඳහා ප්‍රස්ථාරික ක්‍රම භාවිතා කරයි.",
    learningOutcomes: "විස්ථාපන-කාල සහ ප්‍රවේග-කාල ප්‍රස්ථාර ඇඳීම සහ අර්ථකථනය කිරීම.",
    learningAids: "ප්‍රස්ථාර කොළ, අඩි රූල, පෙළ පොත",
    methodology: "ප්‍රස්ථාරවල බෑවුම සහ වර්ගඵලය මගින් චලිත ලක්ෂණ ගණනය කිරීම පැහැදිලි කිරීම.",
    assessment: "ප්‍රස්ථාර ආශ්‍රිත ගැටළු ලබා දීම.",
    other: "-"
  },
  {
    period: "4",
    gradeSubject: "9-B විද්‍යාව",
    competency: "පදාර්ථයේ ස්වභාවය සහ එහි ගුණාංග විමර්ශනය කරයි.",
    learningOutcomes: "පදාර්ථයේ භෞතික ගුණ සහ අංශුමය ස්වභාවය විස්තර කරයි.",
    learningAids: "නිදර්ශක, රූප සටහන්, පෙළ පොත",
    methodology: "පදාර්ථයේ අවස්ථා සහ ඒවායේ වෙනස්වීම් පිළිබඳ සාකච්ඡාව.",
    assessment: "පාඩම අවසානයේ අහඹු ලෙස ප්‍රශ්න ඇසීම.",
    other: "-"
  },
  {
    period: "5",
    gradeSubject: "8-A විද්‍යාව",
    competency: "ශාකවල විවිධත්වය සහ ඒවායේ පැවැත්ම සඳහා අනුවර්තනයන් ගවේෂණය කරයි.",
    learningOutcomes: "ශාක කඳෙහි විවිධත්වය සහ එහි ප්‍රධාන කෘත්‍යයන් හඳුනා ගනී.",
    learningAids: "සජීවී ශාක කොටස්, රූප සටහන්",
    methodology: "පරිසරයේ ඇති විවිධ ශාක කඳන් නිරීක්ෂණය කිරීම සහ සටහන් තැබීම.",
    assessment: "රූප සටහන් ඇඳීම සහ නම් කිරීම පරීක්ෂා කිරීම.",
    other: "-"
  }
];

export default function App() {
  const logRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!logRef.current) return;

    const canvas = await html2canvas(logRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Daily_Log_2026_03_10.pdf');
  };

  return (
    <div className="min-h-screen bg-stone-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 flex items-center gap-3">
              <FileText className="w-8 h-8 text-emerald-600" />
              දෛනික සටහන (Daily Log)
            </h1>
            <p className="text-stone-500 mt-1">2026.03.10 (අඟහරුවාදා) - ඉගැන්වීම් සැලසුම</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-stone-200 text-stone-700 rounded-xl hover:bg-stone-300 transition-colors font-medium"
            >
              <Printer className="w-4 h-4" />
              මුද්‍රණය
            </button>
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all font-medium"
            >
              <Download className="w-4 h-4" />
              PDF ලෙස බාගත කරන්න
            </button>
          </div>
        </div>

        {/* Log Content Area */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-stone-200">
          <div ref={logRef} className="p-8 bg-white text-[11px] leading-tight text-stone-800">
            {/* Table Header */}
            <div className="grid grid-cols-[40px_1.5fr_1.5fr_1.5fr_1fr_1.5fr_1fr_0.8fr] border-t border-l border-stone-800">
              {[
                "කාලච්ඡේදය",
                "ශ්‍රේණිය හා විෂය",
                "නිපුණතාවය හා නිපුණතා මට්ටම",
                "ඉගෙනුම් ඵල",
                "ඉගෙනුම් ආධාරක",
                "ක්‍රියාත්මක වන ආකාරය",
                "ඇගයීම",
                "වෙනත්"
              ].map((header, idx) => (
                <div key={idx} className="p-2 border-r border-b border-stone-800 font-bold bg-stone-50 flex items-center justify-center text-center">
                  {header}
                </div>
              ))}
            </div>

            {/* Table Rows */}
            {LOG_DATA.map((row, idx) => (
              <div key={idx} className="grid grid-cols-[40px_1.5fr_1.5fr_1.5fr_1fr_1.5fr_1fr_0.8fr] border-l border-stone-800">
                <div className="p-2 border-r border-b border-stone-800 text-center flex items-center justify-center">{row.period}</div>
                <div className="p-2 border-r border-b border-stone-800 font-medium">{row.gradeSubject}</div>
                <div className="p-2 border-r border-b border-stone-800">{row.competency}</div>
                <div className="p-2 border-r border-b border-stone-800">{row.learningOutcomes}</div>
                <div className="p-2 border-r border-b border-stone-800">{row.learningAids}</div>
                <div className="p-2 border-r border-b border-stone-800">{row.methodology}</div>
                <div className="p-2 border-r border-b border-stone-800">{row.assessment}</div>
                <div className="p-2 border-r border-b border-stone-800">{row.other}</div>
              </div>
            ))}

            {/* Empty Rows to match format */}
            {[...Array(3)].map((_, idx) => (
              <div key={`empty-${idx}`} className="grid grid-cols-[40px_1.5fr_1.5fr_1.5fr_1fr_1.5fr_1fr_0.8fr] border-l border-stone-800 h-16">
                <div className="p-2 border-r border-b border-stone-800 text-center flex items-center justify-center">{LOG_DATA.length + idx + 1}</div>
                <div className="p-2 border-r border-b border-stone-800"></div>
                <div className="p-2 border-r border-b border-stone-800"></div>
                <div className="p-2 border-r border-b border-stone-800"></div>
                <div className="p-2 border-r border-b border-stone-800"></div>
                <div className="p-2 border-r border-b border-stone-800"></div>
                <div className="p-2 border-r border-b border-stone-800"></div>
                <div className="p-2 border-r border-b border-stone-800"></div>
              </div>
            ))}

            {/* Footer Section */}
            <div className="mt-12 grid grid-cols-2 gap-12 text-sm">
              <div className="space-y-8">
                <div className="border-t border-stone-400 pt-2">ගුරු භවතාගේ අත්සන</div>
                <div>ගුරු භවතාගේ නම : එම්.ඒ.පී.එම්.එස්.ජයසේකර</div>
              </div>
              <div className="space-y-8">
                <div className="border-t border-stone-400 pt-2">විදුහල්පති / නි.විදුහල්පති අත්සන</div>
                <div>දිනය : 2026.03.10</div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
          <h2 className="text-blue-800 font-semibold mb-2 flex items-center gap-2">
            <Save className="w-5 h-5" />
            උපදෙස්
          </h2>
          <ul className="text-blue-700 text-sm list-disc list-inside space-y-1">
            <li>ඉහත වගුව ඔබ ලබා දුන් විෂය කරුණු අනුව සකස් කර ඇත.</li>
            <li>"PDF ලෙස බාගත කරන්න" බොත්තම මගින් මෙය ඔබගේ පරිගණකයට සුරැකිය හැක.</li>
            <li>මුද්‍රණය කිරීම සඳහා "මුද්‍රණය" බොත්තම භාවිතා කරන්න.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
