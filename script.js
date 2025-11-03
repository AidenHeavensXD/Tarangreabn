// ข้อมูลตารางเรียน: วิชาและเวลา (ตามที่แก้ไขล่าสุด)
const schedule = [
    { time: "08:00 - 08:50", Mon: "โฮมรูม", Tue: "ไทย", Wed: "คณิต", Thu: "วิทย์", Fri: "อังกฤษ" },
    { time: "08:50 - 09:40", Mon: "คณิต", Tue: "สังคม", Wed: "ไทย", Thu: "สุขศึกษา", Fri: "ศิลปะ" },
    { time: "09:40 - 10:30", Mon: "วิทย์", Tue: "ศิลปะ", Wed: "คณิต", Thu: "อังกฤษ", Fri: "คอมพิวเตอร์" },
    { time: "10:30 - 11:10", Mon: "พัก", Tue: "พัก", Wed: "พัก", Thu: "พัก", Fri: "พัก" },
    { time: "11:10 - 12:00", Mon: "พักกลางวัน", Tue: "พักกลางวัน", Wed: "พักกลางวัน", Thu: "พักกลางวัน", Fri: "พักกลางวัน" },
    { time: "12:00 - 12:50", Mon: "อังกฤษ", Tue: "วิทย์", Wed: "สังคม", Thu: "ไทย", Fri: "สังคม" },
    { time: "12:50 - 13:40", Mon: "พละ", Tue: "คอมพิวเตอร์", Wed: "พละ", Thu: "แนะแนว", Fri: "พละ" },
    { time: "13:40 - 14:30", Mon: "แนะแนว", Tue: "ลูกเสือ", Wed: "ชมรม", Thu: "พละ", Fri: "ว่าง" },
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// new Date().getDay() จะคืนค่า 0 (อาทิตย์) ถึง 6 (เสาร์)
// เราต้องการ 1=จันทร์, 2=อังคาร, ..., 5=ศุกร์
const todayIndex = new Date().getDay(); 

const tbody = document.getElementById('timetable').getElementsByTagName('tbody')[0];

schedule.forEach(slot => {
    const row = tbody.insertRow();
    
    // คอลัมน์เวลา
    let cell = row.insertCell();
    cell.textContent = slot.time;

    // คอลัมน์วันต่างๆ
    daysOfWeek.forEach((dayKey, index) => {
        let cell = row.insertCell();
        const subject = slot[dayKey] || "-";
        cell.textContent = subject;

        // ไฮไลท์แถว/คอลัมน์พิเศษ (พัก/กลางวัน)
        if (subject.includes("พักกลางวัน")) {
            cell.classList.add('lunch-time');
        } else if (subject.includes("พัก")) {
            cell.classList.add('break-time');
        }

        // ไฮไลท์วันปัจจุบัน (index + 1 เพราะ JS นับวันจันทร์เป็น 1)
        if (index + 1 === todayIndex) {
            cell.classList.add('today');
        }
    });
});
                    { start: 9 * 60 + 30, end: 10 * 60 + 20, cellIndex: 1 }, // คาบ 2
                    { start: 10 * 60 + 20, end: 11 * 60 + 10, cellIndex: 2 }, // คาบ 3
                    // พัก 11:10 - 12:00
                    // กลางวัน 12:00 - 13:00
                    { start: 13 * 60 + 0, end: 13 * 60 + 50, cellIndex: 3 }, // คาบ 5
                    { start: 13 * 60 + 50, end: 14 * 60 + 40, cellIndex: 4 }, // คาบ 6
                    { start: 14 * 60 + 40, end: 15 * 60 + 30, cellIndex: 5 }  // คาบ 7/8
                ];


                // เนื่องจากตารางมี colspan/rowspan และเลขคาบที่หัวตารางอาจไม่ตรงกับ cell index ตรงๆ
                // วิธีที่ง่ายที่สุดคือเทียบกับเวลาแล้วหาเซลล์ที่ใกล้เคียงที่สุด
                // เนื่องจากตารางจริงมี 8 คาบ และมีพัก/กลางวันคั่น
                // เราจะใช้วิธีหาคาบที่กำลังเรียนอยู่ แล้วให้ class กับเซลล์นั้น

                // ตรวจสอบเวลา (ตามคาบเรียนจริงของวันนั้น)
                // (ต้องปรับ Class Index ให้ตรงกับ HTML ที่เขียนจริง)
                const classCells = dayRow.querySelectorAll('.class-cell');

                // ตัวอย่างง่ายๆ (ต้องปรับ index ของ cells ให้ตรงกับเวลา)
                let cellIndexToHighlight = -1;

                // คาบ 1: 08:40-09:30 (index 0)
                if (currentTimeInMinutes >= 8 * 60 + 40 && currentTimeInMinutes < 9 * 60 + 30) {
                    cellIndexToHighlight = 0;
                }
                // คาบ 2: 09:30-10:20 (index 1)
                else if (currentTimeInMinutes >= 9 * 60 + 30 && currentTimeInMinutes < 10 * 60 + 20) {
                    cellIndexToHighlight = 1;
                }
                // คาบ 3: 10:20-11:10 (index 2)
                else if (currentTimeInMinutes >= 10 * 60 + 20 && currentTimeInMinutes < 11 * 60 + 10) {
                    cellIndexToHighlight = 2;
                }
                // ... (เพิ่มเงื่อนไขสำหรับคาบ 5, 6, 7, 8)
                else if (currentTimeInMinutes >= 13 * 60 + 0 && currentTimeInMinutes < 13 * 60 + 50) {
                     // ต้องหา Cell ที่ตรงกับคาบ 5 ในแถว
                     // สำหรับวันจันทร์: คาบ 5 คือ cellIndex ที่ 3 (นับจาก class-cell แรก)
                    cellIndexToHighlight = 3; 
                }
                // ... (ต้องไล่ Cell Index ให้ถูก)
                

                // สำหรับการทดลอง เราจะเน้นแถวของวันปัจจุบันเท่านั้น
                dayRow.style.backgroundColor = '#fff3cd'; // สีเหลืองอ่อนสำหรับแถว

                // ถ้าเจอคาบที่กำลังเรียนอยู่
                if (cellIndexToHighlight !== -1) {
                    // **ข้อควรระวัง: index ต้องนับเฉพาะ element ที่มี class 'class-cell' เท่านั้น**
                    const allClassCells = dayRow.querySelectorAll('.class-cell');
                    if(allClassCells[cellIndexToHighlight]) {
                        allClassCells[cellIndexToHighlight].classList.add('current-class');
                    }
                }
            }
        }
    }

    // เรียกฟังก์ชันเมื่อโหลดหน้าและให้ทำซ้ำทุก 60 วินาที
    highlightCurrentClass();
    setInterval(highlightCurrentClass, 60000);
});
                  
