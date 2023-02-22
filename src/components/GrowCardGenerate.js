import xsquare from '../images/x-square.svg';
import html2canvas from 'html2canvas';
import React, { useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import leaf from '../images/leaf.png';
import background from '../images/background4.jpg';

function GrowCardGenerate({growID, growCardClose}){
    const printRef = React.useRef();
    const [growData, setGrowData] = useState({});
    const [dayDifference, setDayDifference] = useState(0);

    console.log(growID)

    useEffect(()=>{
        getGrowData();
    }, [])


    const getGrowData = async () => {
        const {data, error} = await supabase
          .from('grow_id')
          .select()

          if (error){
            console.log(error)
          }
          for (let i=0; i<data.length; i++){
            if(data[i].id === growID){
                setGrowData(data[i])
            }
          }
    }


    const handleDownloadImage = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
    
        const data = canvas.toDataURL('image/jpg');
        const link = document.createElement('a');
    
        if (typeof link.download === 'string') {
          link.href = data;
          link.download = 'image.jpg';
    
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          window.open(data);
        }
      }

      const getGrowTime = () => {
        let event = new Date(growData.sprout_date);
        let time = event.toJSON();
        let formatedTime = new Date(event).toDateString();
        return formatedTime;
    }

    const getFlowerDate = () => {
        let event = new Date(growData.flower_date);
        let time = event.toJSON();
        let formatedTime = new Date(event).toDateString();
        return formatedTime;

    }
    

    function getNumberOfDays(start, end) {
        const date1 = new Date(start);
        const date2 = new Date(end);
    
        // One day in milliseconds
        const oneDay = 1000 * 60 * 60 * 24;
    
        // Calculating the time difference between two dates
        const diffInTime = date2.getTime() - date1.getTime();
    
        // Calculating the no. of days between two dates
        const diffInDays = Math.round(diffInTime / oneDay);
    
        return diffInDays;
    }

    const getVegTime = () => {
        let sproutDate = new Date(growData.sprout_date);
        let flowerDate = new Date(growData.flower_date);

        if (!sproutDate && !flowerDate){
            return(0)
        } else{
            return(getNumberOfDays(sproutDate, flowerDate))
        }

        
    }


      const cardStyle = () => {
        return({ color: 'white', backgroundColor: 'black', width: '300px', fontFamily: 'PT Sans'})
      }
      const cardListStyle = () => {
        return({display: 'flex', justifyContent: 'space-between', marginRight: '1rem'})
      }
      const cardHeader = () => {
        return({display: 'flex'})
      }

      const imgStyle = () => {
        return({width: '24px', height: '24px'})
      }

    return(
      <div className="show-grow-card">
        <div className='close-button'>
              <img src={xsquare} onClick={() => growCardClose("off")}></img>
            </div>
            <p>Create Note Card to Share Online</p>
        <div style={cardStyle()} ref={printRef} className="grow-card">
            <div style={cardHeader()} className='grow-card-header'>
              <img style={imgStyle()} src={leaf}></img>
              <h5>Green Notez</h5>
            </div>
            <h3>{growData.grow_name}</h3>
            <p>Sprouted: {getGrowTime()}</p>
            <div className='grow-card-info' style={cardListStyle()}>
              <div className='grow-card-left'>
                <p>Nutrient Brand:</p>
                <p>{growData.nute_brand}</p>
                <p>Grow Light:</p>
                <p>{growData.grow_light}</p>
                <p>Tent Size:</p>
                <p>2x2</p>
              </div>
              <div className='grow-card-left'>
                <p>Days in Veg:</p>
                <p>{getVegTime()}</p>
                <p>Days in flower:</p>
                <p>60</p>
                <p>Days from sprout:</p>
                <p>87</p>
              </div>
            </div>
            <p>omgnoez, took a total of 62 notes for {growData.grow_name}. The average PPM for
            water changes in Veg was 300ppm. The average PPM in Flower was 450ppm.  There were
             50 Daily Checks, 12 Water Changes, and 0 Problems logged.</p>
        </div>
          <Button variant="success" onClick={handleDownloadImage}>
            Download
          </Button>
      </div>
    )
}

export default GrowCardGenerate;