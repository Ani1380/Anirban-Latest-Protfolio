import './hero.css';
import heroMainImg from '../../assets/Hero_Main.png';
import Button from '../button/button';
import { GrDocumentDownload} from "react-icons/gr";
import { MdOutlineCall } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";


function buttonClickFunction(message){
    alert(message);
}
export default function Hero(){
    return (
        <div className='hero-section'>
            <div className='hero-left'>
                <h1 className='name'>
                    Anirban Karmakar
                </h1>
                <h3 className="title">
                    Senior Software Engineer
                </h3>
                <h1 className="about-me">
                    I build end-to-end business software <br/>quietly and completely.
                </h1>
                <h3 className="about-me-2">
                    4 years of experience in Salesforce-based Loan Management Systems. 
                    <br/>I care about systems that work the first time, every time — from business requirement to production.
                </h3>
                <div className="button-section">
                    <Button onClick={() => buttonClickFunction('Resume clicked')} variant='primary' className='hero-btn'>
                        <GrDocumentDownload /> Download CV
                    </Button>
                    <Button onClick={() => buttonClickFunction('Resume clicked')} variant='secondary' className='hero-btn'>
                        <MdOutlineCall /> Contact Me
                    </Button>
                    <Button onClick={() => buttonClickFunction('Resume clicked')} variant='secondary' className='hero-btn'>
                        <CiLinkedin /> LinkedIn
                    </Button>
                </div>
            </div>
            <div className="hero-right">
                <div className="image-container">
                    <img className='heroImage' src={heroMainImg} alt='Anirban-Karmakar-Avatar' />
                </div>
            </div>
        </div>
    );
} 