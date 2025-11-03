// script.js

// ข้อมูลตารางเรียน: วิชา, ครู, ห้อง (ตรงตามรูปภาพ ม. 3/2)
const schedule = [
    // เวลาเรียน (08:40-09:30, 09:30-10:20, 10:20-11:10, 11:10-12:00, 12:00-13:00, 13:00-13:50, 13:50-14:40, 14:40-15:30)
    // หมายเหตุ: มีการปรับเวลาให้ตรงกับรูป (คาบ 4 11:10-12:00 คือ พัก)
    { time: "08:40-09:30", 
        Mon: { subject: "โฮมรูม", teacher: "ครูทัศพร", room: "2307" }, 
        Tue: { subject: "ท23102", teacher: "ครูชญาณิน", room: "2104" }, 
        Wed: { subject: "ง23102", teacher: "ครูชวนใจ", room: "3305" }, 
        Thu: { subject: "ว23205", teacher: "ครูธรรมนัย", room: "3305" }, 
        Fri: { subject: "ส23102", teacher: "ครูพรพิมล", room: "2202" } 
    },
    { time: "09:30-10:20", 
        Mon: { subject: "อ23102", teacher: "ครูทัศพร", room: "3308" }, 
        Tue: { subject: "ว23102", teacher: "ครูจารุวรรณ", room: "3206" }, 
        Wed: { subject: "ศ23102", teacher: "ครูศรีรา", room: "2104" }, 
        Thu: { subject: "ค23102", teacher: "ครูเบญจพร", room: "3206" }, 
        Fri: { subject: "คนคว้า", teacher: "ครูอิศระ", room: "" } 
    },
    { time: "10:20-11:10", 
        Mon: { subject: "ค23206", teacher: "ครูธัญญกัลยา", room: "3305" }, 
        Tue: { subject: "ว23102", teacher: "ครูจารุวรรณ", room: "3206" }, 
        Wed: { subject: "ว23205", teacher: "ครูธรรมนัย", room: "3206" }, 
        Thu: { subject: "ว23102", teacher: "ครูจารุวรรณ", room: "3206" }, 
        Fri: { subject: "อ23102", teacher: "ครูทัศพร", room: "2307" } 
    },
    // คาบพัก (11:10 - 12:00)
    { time: "11:10-12:00", 
        Mon: { subject: "พัก", teacher: "กลางวัน", room: "" }, 
        Tue: { subject: "พัก", teacher: "กลางวัน", room: "" }, 
        Wed: { subject: "พัก", teacher: "กลางวัน", room: "" }, 
        Thu: { subject: "พัก", teacher: "กลางวัน", room: "" }, 
        Fri: { subject: "พัก", teacher: "กลางวัน", room: "" } 
    },
    // คาบ 5
    { time: "12:00-13:00", 
        Mon: { subject: "ค23102", teacher: "ครูเบญจพร", room: "3304" }, 
        Tue: { subject: "ค23204", teacher: "ครูอรวรรณ", room: "ซซบ2" }, 
        Wed: { subject: "ส23102", teacher: "ครูศรีรา", room: "2202" }, 
        Thu: { subject: "ท23102", teacher: "ครูธัญญกัลยา", room: "2104" }, 
        Fri: { subject: "ส23206", teacher: "ครูพิมพิศา", room: "3206" } 
    },
    // คาบ 6
    { time: "13:00-13:50", 
        Mon: { subject: "ว23102", teacher: "ครูพฤทธิมน", room: "2202" }, 
        Tue: { subject: "ส23902", teacher: "ครูสุภาภรณ์", room: "อาคารโดม" }, 
        Wed: { subject: "ค23204", teacher: "ครูปณิณา", room: "4203" }, 
        Thu: { subject: "ค23206", teacher: "ครูธัญญกัลยา", room: "3308" }, 
        Fri: { subject: "ท23102", teacher: "ครูชญาณิน", room: "2104" } 
    },
    // คาบ 7
    { time: "13:50-14:40", 
        Mon: { subject: "ค23102", teacher: "ครูรัตน์พรรณ", room: "2204" }, 
        Tue: { subject: "อ23102", teacher: "ครูทัศพร", room: "2307" }, 
        Wed: { subject: "ว23282", teacher: "ครูปณิณา", room: "4203" }, 
        Thu: { subject: "ศ23102", teacher: "ครูศรีรา", room: "3308" }, 
        Fri: { subject: "ว23902", teacher: "ครูรุ่งเรือง", room: "2108" } 
    },
    // คาบ 8
    { time: "14:40-15:30", 
        Mon: { subject: "คนคว้า", teacher: "ครูอิศระ", room: "" }, 
        Tue: { subject: "กิจกรรม", teacher: "", room: "" }, 
        Wed: { subject: "กิจกรรม", teacher: "", room: "" }, 
        Thu: { subject: "ชุมนุม", teacher: "ครูนาฏศิลป์", room: "" }, 
        Fri: { subject: "สังคมและสาธารณประโยชน์", teacher: "", room: "" }
    }
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// new Date().getDay() จะคืนค่า 0 (อาทิตย์) ถึง 6 (เสาร์)
// เราต้องการ 1=จันทร์, 2=อังคาร, ..., 5=ศุกร์
const todayIndex = new Date().getDay(); 

// ตรวจสอบว่า DOM โหลดเสร็จแล้วก่อนจะพยายามเข้าถึง element
document.addEventListener('DOMContentLoaded', () => {
    const timetableElement = document.getElementById('timetable');
    if (!timetableElement) {
        console.error("Element with ID 'timetable' not found. Check index.html structure.");
        return;
    }

    // เข้าถึง tbody ของตาราง
    const tbody = timetableElement.getElementsByTagName('tbody')[0];
    if (!tbody) {
        console.error("Tbody element not found. Check index.html structure.");
        return;
    }

    // ฟังก์ชันสร้างตาราง
    function buildTimetable() {
        // ล้างเนื้อหาเก่าก่อนสร้างใหม่ (หากมีการเรียกใช้ซ้ำ)
        tbody.innerHTML = ''; 

        schedule.forEach(slot => {
            const row = tbody.insertRow();
            
            // คอลัมน์เวลา
            let cellTime = row.insertCell();
            cellTime.textContent = slot.time;
            cellTime.classList.add('time-slot');

            // คอลัมน์วันต่างๆ
            daysOfWeek.forEach((dayKey, index) => {
                let cell = row.insertCell();
                const data = slot[dayKey];
                
                // ตรวจสอบว่าเป็นคาบว่าง/กิจกรรม/พัก
                if (data.subject.includes("พัก") || data.subject.includes("กิจกรรม") || data.subject.includes("ชุมนุม") || data.subject.includes("คนคว้า") || data.subject.includes("สังคมและสาธารณประโยชน์")) {
                    // สำหรับคาบพักกลางวัน ให้แสดงคำว่า "พักกลางวัน" ชัดเจน
                    cell.textContent = data.subject === "พัก" ? `${data.subject} ${data.teacher}` : data.subject;
                    
                    if (data.subject.includes("พัก") && data.teacher.includes("กลางวัน")) {
                        cell.classList.add('lunch-time');
                    } else if (data.subject.includes("พัก")) {
                        cell.classList.add('break-time');
                    }
                } else {
                    // ใส่ข้อมูลวิชา ครู และห้อง
                    cell.innerHTML = `
                        <strong>${data.subject}</strong><br>
                        ครู: ${data.teacher}<br>
                        ห้อง: ${data.room || '-'}
                    `;
                    cell.classList.add('class-cell');
                }

                // ไฮไลท์วันปัจจุบัน
                if (index + 1 === todayIndex) {
                    cell.classList.add('today');
                }
            });
        });
    }

    // สร้างตารางเมื่อโหลดหน้าเสร็จ
    buildTimetable();
});

        Wed: { subject: "พักกลางวัน", teacher: "", room: "" }, 
        Thu: { subject: "พักกลางวัน", teacher: "", room: "" }, 
        Fri: { subject: "พักกลางวัน", teacher: "", room: "" } 
    },
    { time: "12:00 - 12:50", 
        Mon: { subject: "ค23102", teacher: "ครูเบญจพร", room: "3304" }, 
        Tue: { subject: "ค23204", teacher: "ครูอรวรรณ", room: "ซซบ2" }, 
        Wed: { subject: "ส23102", teacher: "ครูศรีรา", room: "2202" }, 
        Thu: { subject: "ค23206", teacher: "ครูธัญญกัลยา", room: "3308" }, 
        Fri: { subject: "ส23206", teacher: "ครูพิมพิศา", room: "3206" } 
    },
    { time: "12:50 - 13:40", 
        Mon: { subject: "ว23102", teacher: "ครูพฤทธิมน", room: "2202" }, 
        Tue: { subject: "อ23102", teacher: "ครูทัศพร", room: "2307" }, 
        Wed: { subject: "พ23104", teacher: "ครูปณิณ", room: "4203" }, 
        Thu: { subject: "ศ23102", teacher: "ครูศรีรา", room: "3308" }, 
        Fri: { subject: "ท23102", teacher: "ครูชญาณิน", room: "2104" } 
    },
    { time: "13:40 - 14:30", 
        Mon: { subject: "พ23104", teacher: "ครูอิศระ", room: "2204" }, 
        Tue: { subject: "กิจกรรม", teacher: "", room: "" }, 
        Wed: { subject: "ว23282", teacher: "ครูปณิณ", room: "4203" }, 
        Thu: { subject: "ชุมนุม", teacher: "", room: "" }, 
        Fri: { subject: "ก23902", teacher: "ครูรุ่งเรือง", room: "2108" } 
    },
    { time: "14:30 - 15:20", 
        Mon: { subject: "คนคว้า", teacher: "", room: "" }, 
        Tue: { subject: "ว่าง", teacher: "", room: "" },
        Wed: { subject: "กิจกรรม", teacher: "", room: "" },
        Thu: { subject: "ว่าง", teacher: "", room: "" },
        Fri: { subject: "สังคมและสาธารณประโยชน์", teacher: "", room: "" }
    }
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const todayIndex = new Date().getDay(); 
const tbody = document.getElementById('timetable').getElementsByTagName('tbody')[0];

schedule.forEach(slot => {
    const row = tbody.insertRow();
    
    // คอลัมน์เวลา
    let cellTime = row.insertCell();
    cellTime.textContent = slot.time;
    cellTime.classList.add('time-slot');

    // คอลัมน์วันต่างๆ
    daysOfWeek.forEach((dayKey, index) => {
        let cell = row.insertCell();
        const data = slot[dayKey];
        
        // ตรวจสอบว่าเป็นคาบว่าง/กิจกรรม/พัก
        if (data.subject.includes("พัก") || data.subject.includes("กิจกรรม") || data.subject.includes("ว่าง") || data.subject.includes("ชุมนุม") || data.subject.includes("คนคว้า") || data.subject.includes("สังคมและสาธารณประโยชน์")) {
            cell.textContent = data.subject;
            
            if (data.subject.includes("พักกลางวัน")) {
                cell.classList.add('lunch-time');
            } else if (data.subject.includes("พัก")) {
                cell.classList.add('break-time');
            }
        } else {
            // ใส่ข้อมูลวิชา ครู และห้อง
            cell.innerHTML = `
                <strong>${data.subject}</strong><br>
                ครู: ${data.teacher}<br>
                ห้อง: ${data.room || '-'}
            `;
            cell.classList.add('class-cell');
        }

        // ไฮไลท์วันปัจจุบัน (index + 1 เพราะ JS นับวันจันทร์เป็น 1)
        if (index + 1 === todayIndex) {
            cell.classList.add('today');
        }
    });
});
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
                  
