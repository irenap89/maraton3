
import './BgRemove.css';
import close from './assets/close.png'
import logo from './assets/logo.png'
import banner from './assets/banner.png'
import { useState , useRef } from "react";
import axios from 'axios';
import DownloadImg from './DownloadImg';
import Image from './Image'

import DownloadsFolder from './assets/Downloads Folder.png';

import close1 from './assets/close1.png'
import not_robot from './assets/not_robot.png'
function BgRemove() {

  const [tabname, settabname] = useState('no_bg');
  const [open_poup, setopen_poup] = useState(false);

  const [open_poup_download, setopen_poup_download] = useState(false);

  const [show_error, setshow_error] = useState(false);

  const [upload_img_name, setupload_img_name] = useState(false);
  const [colorexist, setcolorexist] = useState(false);


  const inputFileElement = useRef();

  const focusInput = () => {
    inputFileElement.current.click();
  };


  function tab_click(e) {

    if (e.target.className =="tab_button_original") {
      settabname('original');
    } else {
      settabname('no_bg');
    }
   
  }

  function open_popup() {
    setopen_poup(true);
  }


  function close_popup() {
    setopen_poup(false);
  }

  function show_popup_func() {
    setopen_poup_download(true);
  }

  function send_to_server(e) {

   let file = e.target.files[0];

    if(file.type=="image/png" || file.type=="image/jpeg") {

      setshow_error(false);

      let formData = new FormData();

      formData.append("UploadedFile", file);

      let headers={
        "Content-Type": "multipart/form-data"
      }


      axios.post('http://localhost:5000/upload_img', formData, headers)
        .then(res => {
            setupload_img_name(res.data);
        })
    } else {
      setshow_error(true);
    }
   
  }

  function color_exist(){
      setcolorexist(true);
  }

  return (
    <div>
        <div className='bg_div_cont'>
            <div className='bg_div_header'>
                <img src={close} className='close_img'/>
                <div className="bg_div_header_title"> העלאת תמונה כדי להסיר את הרקע </div>
                <button className="bg_div_header_button" onClick={focusInput}> העלאת תמונה </button>
                <input type="file" ref={inputFileElement} onChange={send_to_server} className='file_input'/>

                <div className="bg_div_header_subtext"> פורמטים נתמכים png, jpeg</div>
                {show_error ? <div className='error'> קובץ לא נתמך </div>: "" }
            </div>

            <div className="main_cont">
                <div className="main_left">
                    <div className="middle_div_left">
                        <div className="tab_button_no_bg" style={{borderBottom: (tabname=="no_bg" ? "3px solid #9C27B0": "")}} onClick={tab_click}> הוסר רקע </div>
                        <div className="tab_button_original"  style={{borderBottom: (tabname=="original" ? "3px solid #9C27B0": "")}} onClick={tab_click}> מקורי </div>
                    
                    {tabname == "no_bg" ? 
                        <Image  image_only={false} upload_img_name={(colorexist ? "color_" : "") +"no_bg_"+upload_img_name} color_func={color_exist}/>
                        : 
                        <Image image_only={true} upload_img_name={upload_img_name}/>
                    }

                    </div>

                  

                  <div className="main_left_footer">
                      <div className="main_left_footer_text"> על ידי העלאת תמונה אתה מסכים לתנאים וההגבלות.</div>
                      <button className="main_left_footer_btn"  onClick={open_popup}> תקנון חברה </button>
                  </div>

                </div>

                <div className="main_right">
                  <div className="middle_div_right">
                    <DownloadImg  show_popup={show_popup_func} title="תמונה חינם" subtitle="612x408  תצוגה מקדימה של תמונה" btnText="הורד" subsubtext="איכות טובה עד 0.25 מגה פיקסל" borderFlag={true} newImage={false}/>
                    <DownloadImg title="Pro" subtitle="1280x1920 תמונה מלאה " btnText=" HD הורד"  subsubtext="איכות טובה עד 0.25 מגה פיקסל" borderFlag={false} newImage={true}/>
                  </div>
                </div>

            </div>

            <div className="footer_cont">
                <img src={logo} className="logo"/>
                <a href="http://www.google.com" target="_blank"><img src={banner} className="banner"/></a>
            </div>
        </div>
          {open_poup ? 
          <>

            <div className='takanon_popup_overlay'> </div>           
            <div className='takanon_popup'>
              <img src={close} className='close_popup_img' onClick={close_popup}/>
            What is Lorem Ipsum?
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type 
            specimen book. It has survived not only five centuries, but also the leap into 
            electronic typesetting, remaining essentially unchanged. It was popularised in 
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker 
              including versions of Lorem Ipsum.

            </div>
          </>
        : "" }


{open_poup_download ? 
      <div className="download_popup">
          <img src={close1} className='close_img_popup' onClick={()=>setopen_poup_download(false)}/>
          <div className='top_img'>
            <img src={DownloadsFolder} className='DownloadsFolder'/>
          </div>

          <div className='download_popup_title'> אישור להורדת תמונה </div>
          <div className='download_popup_subtitle'> האם להוריד את התמונה ? </div>

          <div className='not_robot_cont'>
          <img src={not_robot}  className='not_robot'/>
          <span  className='download_popup_not_robot'> אני לא רובוט </span>
         
           <input  className='download_popup_checkbox' type="checkbox" /> 
          
          </div>

        <button  className='download_popup_cencel' onClick={()=>setopen_poup_download(false)}> ביטול </button> 
        <button className='download_popup_approve'> אישור </button> 

      </div> : "" }

    </div>
  );
}

export default BgRemove;
