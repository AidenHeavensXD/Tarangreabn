document.addEventListener('DOMContentLoaded', (event) => {
    const timetable = document.getElementById('timetable');

    function highlightCurrentClass() {
        const now = new Date();
        const day = now.getDay(); // 0=อาทิตย์, 1=จันทร์, ..., 5=ศุกร์, 6=เสาร์
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentTimeInMinutes = hours * 60 + minutes;

        // ลบคลาส 'current-class' ออกจากเซลล์ทั้งหมดก่อน
        document.querySelectorAll('.current-class').forEach(cell => {
            cell.classList.remove('current-class');
        });

        // ตรวจสอบเฉพาะวันจันทร์ถึงศุกร์ (1-5)
        if (day >= 1 && day <= 5) {
            // กำหนดเวลาเริ่มต้นของแต่ละคาบเรียนในหน่วยนาที (รวมเวลาพัก)
            // 08:40, 09:30, 10:20, 11:10 (พัก), 12:00 (กลางวัน), 13:00, 13:50, 14:40
            const classStartTimes = [
                { start: 8 * 60 + 40, end: 9 * 60 + 30, cellIndex: 1, dayId: 1 }, // คาบ 1 (จ.มี colspan)
                { start: 9 * 60 + 30, end: 10 * 60 + 20, cellIndex: 3, dayId: 1 }, // คาบ 2
                { start: 10 * 60 + 20, end: 11 * 60 + 10, cellIndex: 4, dayId: 1 }, // คาบ 3
                // พัก 11:10 - 12:00
                // กลางวัน 12:00 - 13:00
                { start: 13 * 60 + 0, end: 13 * 60 + 50, cellIndex: 6, dayId: 1 }, // คาบ 5
                { start: 13 * 60 + 50, end: 14 * 60 + 40, cellIndex: 7, dayId: 1 }, // คาบ 7
                { start: 14 * 60 + 40, end: 15 * 60 + 30, cellIndex: 8, dayId: 1 }  // คาบ 8
            ];
            // หมายเหตุ: การใช้ cellIndex ต้องระวังเนื่องจากมี colspan/rowspan (อาจต้องปรับตามโครงสร้าง HTML จริง)

            // ตัวอย่างแบบง่าย: หาแถวของวันปัจจุบัน
            let dayIdMap = {
                1: 'monday',
                2: 'tuesday',
                3: 'wednesday',
                4: 'thursday',
                5: 'friday'
            };

            const dayRow = document.getElementById(dayIdMap[day]);
            if (dayRow) {
                const cells = dayRow.querySelectorAll('.class-cell');
                let cellToHighlight = null;

                // ตรวจสอบเวลาตามคาบเรียน (ต้องนับ cell index ให้ถูกตาม rowspan/colspan)
                // ตารางนี้เริ่มที่ index 0 คือ day-header
                // วันจันทร์: 1=1/2, 3=2, 4=3, (5=พัก/กลางวัน), 6=5, 7=6, 8=7, 9=8
                let classTimesForDay = [
                    { start: 8 * 60 + 40, end: 9 * 60 + 30, cellIndex: 0 }, // คาบ 1
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
                  
