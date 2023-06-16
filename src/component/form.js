import React, { useState } from 'react';
import Calendar from './Calendar';
import Form from 'react-bootstrap/Form';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserNurse } from '@fortawesome/free-solid-svg-icons';


const MainForm = () => {
  const [date, setDate] = useState(null);
  const [today, setToday] = useState(new Date());
  const [name, setName] = useState('');
  const [passid, setPassid] = useState('');
  const [gender, setGender] = useState('');
  const [showEmptyFieldsModal, setShowEmptyFieldsModal] = useState(false);
  const [showSubmittedDataModal, setShowSubmittedDataModal] = useState(false);
  const [CheakModal, setshowCheakModal] = useState(false);


  const formatSelectedDate = (selectedDate) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return selectedDate.toLocaleDateString('th', options);
  };

  const diffYear = (date, today) => {
    if (date != null) {
      const minYear = date.getFullYear();
      const minMonth = date.getMonth();
      const minDay = date.getDate();

      const thaiDateOptions = {
        // year: 'numeric',
        month: 'long',
        day: 'numeric',
        calendar: 'buddhist',
        // numberingSystem: 'thai',
        locale: 'th-TH'
      };
      const thaiDate = date.toLocaleDateString('th-TH', thaiDateOptions);
      const currentYear = today.getFullYear();

      const age = today.getFullYear() - minYear;
      if (today.getMonth() >= minMonth && today.getDate() >= minDay) {
        if (age >= 65) {
          return (
            <div style={{ color: 'green' }}>สามารถเข้ารับบริการได้</div>
          );
        } else if (age == 64) {
          return (
            <div>
              <div style={{ color: 'red' }}>ไม่สามารถเข้ารับบริการได้ เนื่องจากอายุจะครบ 65 ปี</div>
              {/* <div> ใน{date && formatSelectedDate(date.getDate())}</div> */}
            </div>

          );
        } else if (age < 64 && age > 2) {
          return (
            <div>
              <div style={{ color: 'red' }}>ไม่สามารถเข้ารับบริการได้ เนื่องจากไม่ตรงตามเงื่อนไข</div>
              <div style={{ color: 'violet'}}> ปีนี้คุณอายุ {age} ปี </div>
            </div>
          )
        } else if (age <= 2 && age >= 1) {
          return (
            <div style={{ color: 'green' }}>สามารถเข้ารับบริการได้</div>
          );
        } else if (age < 1 && (today.getMonth - minMonth + 12) % 12 === 0) {
          return (
            <div style={{ color: 'green' }}>สามารถเข้ารับบริการได้</div>
          );
        } return (
          <div>
            <div style={{ color: 'red' }}>ไม่สามารถเข้ารับบริการได้ เนื่องจากอายุไม่ถึง 6 เดือน</div>

          </div>
        );
      } else
        if (age - 1 >= 65) {
          return (
            <div style={{ color: 'green' }}>สามารถเข้ารับบริการได้</div>
          );
        } else if (age - 1 == 64) {
          return (
            <div>
              <div style={{ color: 'red' }}>ไม่สามารถเข้ารับบริการได้ เนื่องจากอายุจะครบ 65 ปี</div>
              <div> ในวันที่ {thaiDate} {currentYear + 543} ที่กำลังจะถึงนี้ ขออภัยในความไม่สะดวก</div>
            </div>

          );
        } else if (age - 1 < 64 && age > 2) {
          return (
            <div>
              <div style={{ color: 'red' }}>ไม่สามารถเข้ารับบริการได้ เนื่องจากไม่ตรงตามเงื่อนไข</div>
              <div style={{ color: 'violet'}}> ปีนี้คุณอายุ {age} ปี </div>
            </div>
          )
        } else if (age - 1 <= 2 && age >= 1) {
          return (
            <div style={{ color: 'green' }}>สามารถเข้ารับบริการได้</div>
          );
        } else if (age - 1 < 1 && (today.getMonth - minMonth + 12) % 12 === 0) {
          return (
            <div style={{ color: 'green' }}>สามารถเข้ารับบริการได้</div>
          );
        } return (
          <div>
            <div style={{ color: 'red' }}>ไม่สามารถเข้ารับบริการได้ เนื่องจากอายุไม่ถึง 6 เดือน</div>

          </div>
        );
    }
  }

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    diffYear(selectedDate, today);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePass = (e) => {
    setPassid(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleSubmis = () => {
    setshowCheakModal(false)
    if (!name || !passid || !gender || !date) {
      setShowEmptyFieldsModal(true);
    } else {
      setShowSubmittedDataModal(true);
    }
  };

  const handleClear = () => {
    setDate(null);
    setName('');
    setPassid('');
    setGender('');
    window.location.reload();
  };

  const handleCloseEmptyFieldsModal = () => {
    setShowEmptyFieldsModal(false);
  };

  const handleCloseSubmittedDataModal = () => {
    setShowSubmittedDataModal(false);
    setDate(null);
    setName('');
    setPassid('');
    setGender('');
    window.location.reload();
  };

  const showCheakModal = () => {
    setshowCheakModal(true)
  }

  const handleCloseCheak = () => {
    setshowCheakModal(false)
  }



  function SelectBasicExample() {
    return (
      <Form.Select aria-label="Default select example" onChange={handleGender} value={gender}>
        <option>ระบุ</option>
        <option value="ชาย">ชาย</option>
        <option value="หญิง">หญิง</option>
      </Form.Select>
    );
  }
  /*----------------------------------------------------------------------------*/
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-header text-hearder'>ลงทะเบียนรับวัคซีน
          <FontAwesomeIcon icon={faUserNurse} style={{ paddingLeft: '15px' }} />
          <div className='aboutText'>
            กิจกรรมการฉีดวัคซีนป้องกันโควิด 19 เปิดให้ผู้รับบริการสามารถเข้ารับบริการฉีดวัคซีน ในวันที่ 1 มิถุนายน พ.ศ.2566 – 31 สิงหาคม พ.ศ.2566 โดยมีเงื่อนไขการเข้ารับวัคซีน ดังนี้
            ผู้สูงอายุ 65 ปีขึ้นไป (ชาย,หญิง)
            เด็กที่มีอายุระหว่าง 6 เดือน ถึง 2 ปี (ชาย,หญิง)
            โดยหากผู้มารับบริการมีอายุไม่ตรงตามเงื่อนไข หรือมารับบริการไม่ตรงช่วงเวลาที่มีสิทธิ์ จะไม่สามารถรับวัคซีนได้

          </div>
        </div>

        <div className='customtext'>ชื่อ-นามสกุล</div>
        <input
          placeholder="ชื่อ-นามสกุล"
          value={name}
          onChange={handleName}
          className={name ? '' : 'empty-field form-control'}
        />
        <div className='customtext'>เลขบัตรประจำตัวประชาชน</div>
        <input
          placeholder="เลขบัตรประจำตัวประชาชน"
          value={passid}
          onChange={handlePass}
          className={passid ? '' : 'empty-field form-control'}
        />
        <div className='customtext'>เพศ</div>
        <SelectBasicExample />
        <div className='customtext'>วันเดือนปีเกิด: {date && formatSelectedDate(date)}</div>
        <Calendar onSelect={handleDateSelect} />
        <button className="btn btn-success" onClick={showCheakModal}>
          ยืนยันข้อมูล
        </button>
        <button className="btn btn-danger" onClick={handleClear}>ล้างข้อมูล</button>

        <Modal show={CheakModal} onHide={handleCloseCheak}>
          <Modal.Header closeButton>
            <Modal.Title>ยืนยันข้อมูล</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ตรวจสอบให้แน่ใจว่ากรอกข้อมูลที่จำเป็นครบถ้วนแล้ว

          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-warning" onClick={handleSubmis}>
              ตรวจสอบ
            </button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEmptyFieldsModal} onHide={handleCloseEmptyFieldsModal}>
          <Modal.Header closeButton>
            <Modal.Title>โปรดใส่ข้อมูลให้ครบถ้วน</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {(!name || name === '') && <div style={{ color: 'red' }}>ชื่อ-นามสกุล</div>}
            {(!passid || passid === '') && <div style={{ color: 'red' }}>บัตรประชาชน</div>}
            {(!gender || gender === '') && <div style={{ color: 'red' }}>เพศ</div>}
            {!date && <div style={{ color: 'red' }}>วันเดือนปีเกิด</div>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEmptyFieldsModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showSubmittedDataModal} onHide={handleCloseSubmittedDataModal}>
          <Modal.Header closeButton>
            <Modal.Title>เสร็จสิ้นการลงทะเบียน</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='showText'>ชื่อ-นามสกุล: {name}</div>
            <div className='showText'>เลขบัตรประจำตัวประชาชน: {passid}</div>
            <div className='showText'>เพศ: {gender}</div>
            <div className='showText'>วันเดือนปีเกิด: {date && formatSelectedDate(date)}</div>
            <div>{diffYear(date, today)}</div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-danger" onClick={handleCloseSubmittedDataModal}>
              ย้อนกลับ
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default MainForm;
