import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from './Auth';

const InspiringQuotes = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [audience, setAudience] = useState('Self-improvers');
    const [customAudience, setCustomAudience] = useState('');
    const [lookAndFeel, setLookAndFeel] = useState('Inspirational');
    const [platform, setPlatform] = useState('YouTube');
    const [videoUrl, setVideoUrl] = useState('');
    const [backgroundMusic, setBackgroundMusic] = useState(null);
    const [subtitleText, setSubtitleText] = useState('');
    const [trimStart, setTrimStart] = useState('');
    const [trimEnd, setTrimEnd] = useState('');
    const [videoSpeed, setVideoSpeed] = useState('1');
    const [filter, setFilter] = useState('none');
    const [animation, setAnimation] = useState('none');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [removeBackground, setRemoveBackground] = useState(false);
    const [logo, setLogo] = useState(null);
    const [volume, setVolume] = useState('1');
    const [transitionEffect, setTransitionEffect] = useState('none');
    const [rotation, setRotation] = useState('0');
    const [contrast, setContrast] = useState('1');
    const [brightness, setBrightness] = useState('1');
    const [saturation, setSaturation] = useState('1');
    const [watermark, setWatermark] = useState('Stock Watermarks');
    const [branding, setBranding] = useState('Normal');
    const [exportResolution, setExportResolution] = useState('480p');
    const [workflow, setWorkflow] = useState('YouTube Explainer');
    const [plugins, setPlugins] = useState([]);
    const [mergeVideos, setMergeVideos] = useState([]);
    const [noiseReduction, setNoiseReduction] = useState(false);
    const [soundEffect, setSoundEffect] = useState('none');
    const [transcript, setTranscript] = useState('');
    const [resolution, setResolution] = useState('1080p');
    const [vignette, setVignette] = useState(false);
    const [timeEffect, setTimeEffect] = useState('none');
    const [textAnimation, setTextAnimation] = useState('none');
    const [removeSilence, setRemoveSilence] = useState(false);
    const [socialMedia, setSocialMedia] = useState('none');
    const [gifDuration, setGifDuration] = useState('');
    const [titleSlideText, setTitleSlideText] = useState('');
    const [endSlideText, setEndSlideText] = useState('');
    const [ctaText, setCtaText] = useState('');
    const [editedVideoUrl, setEditedVideoUrl] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const audienceValue = audience === 'Custom' ? customAudience : audience;
        try {
            const response = await axios.post('http://localhost:5000/inspiring-quotes', { quote, author, audience: audienceValue, lookAndFeel, platform }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setVideoUrl(response.data.videoUrl);
        } catch (error) {
            console.error('Error creating inspirational quote video', error);
        }
    };

    const handleGenerate = async () => {
        try {
            const formData = new FormData();
            formData.append('videoUrl', videoUrl);
            if (backgroundMusic) {
                formData.append('backgroundMusic', backgroundMusic);
            }
            formData.append('subtitleText', subtitleText);
            formData.append('trimStart', trimStart);
            formData.append('trimEnd', trimEnd);
            formData.append('videoSpeed', videoSpeed);
            formData.append('filter', filter);
            formData.append('animation', animation);
            formData.append('backgroundColor', backgroundColor);
            formData.append('removeBackground', removeBackground);
            if (logo) {
                formData.append('logo', logo);
            }
            formData.append('volume', volume);
            formData.append('transitionEffect', transitionEffect);
            formData.append('rotation', rotation);
            formData.append('contrast', contrast);
            formData.append('brightness', brightness);
            formData.append('saturation', saturation);
            formData.append('watermark', watermark);
            formData.append('branding', branding);
            formData.append('exportResolution', exportResolution);
            formData.append('workflow', workflow);
            if (mergeVideos.length > 0) {
                mergeVideos.forEach((video, index) => {
                    formData.append(`mergeVideo${index}`, video);
                });
            }
            formData.append('noiseReduction', noiseReduction);
            formData.append('soundEffect', soundEffect);
            formData.append('resolution', resolution);
            formData.append('vignette', vignette);
            formData.append('timeEffect', timeEffect);
            formData.append('textAnimation', textAnimation);
            formData.append('removeSilence', removeSilence);
            formData.append('socialMedia', socialMedia);
            formData.append('gifDuration', gifDuration);
            formData.append('titleSlideText', titleSlideText);
            formData.append('endSlideText', endSlideText);
            formData.append('ctaText', ctaText);
            formData.append('plugins', plugins);
            const response = await axios.post('http://localhost:5000/generate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            setEditedVideoUrl(response.data.editedVideoUrl);
            setTranscript(response.data.transcript);
        } catch (error) {
            console.error('Error generating edited video', error);
        }
    };

    const handleShare = async (platform) => {
        try {
            await axios.post('http://localhost:5000/share', { platform, videoUrl: editedVideoUrl }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(`Video shared on ${platform}`);
        } catch (error) {
            console.error('Error sharing video on social media', error);
        }
    };

    const handleMergeVideoChange = (event) => {
        const files = Array.from(event.target.files);
        setMergeVideos(files);
    };

    return (
        <div>
            {!token ? (
                <Auth />
            ) : (
                <div>
                    <h2>Create Inspirational Quote Video</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Quote:</label>
                            <textarea value={quote} onChange={(e) => setQuote(e.target.value)} />
                        </div>
                        <div>
                            <label>Author:</label>
                            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </div>
                        <div>
                            <label>Audience:</label>
                            <select value={audience} onChange={(e) => setAudience(e.target.value)}>
                                <option value="Self-improvers">Self-improvers</option>
                                <option value="Students">Students</option>
                                <option value="Entrepreneurs">Entrepreneurs</option>
                                <option value="Teachers">Teachers</option>
                                <option value="Fitness Enthusiasts">Fitness Enthusiasts</option>
                                <option value="Travelers">Travelers</option>
                                <option value="Parents">Parents</option>
                                <option value="Artists">Artists</option>
                                <option value="Tech Enthusiasts">Tech Enthusiasts</option>
                                <option value="Writers">Writers</option>
                                <option value="Gamers">Gamers</option>
                                <option value="Musicians">Musicians</option>
                                <option value="Foodies">Foodies</option>
                                <option value="Fashion Enthusiasts">Fashion Enthusiasts</option>
                                <option value="Pet Owners">Pet Owners</option>
                                <option value="Environmentalists">Environmentalists</option>
                                <option value="Health Enthusiasts">Health Enthusiasts</option>
                                <option value="Historians">Historians</option>
                                <option value="Philosophers">Philosophers</option>
                                <option value="Scientists">Scientists</option>
                                <option value="Startup Founders">Startup Founders</option>
                                <option value="Photographers">Photographers</option>
                                <option value="Gardeners">Gardeners</option>
                                <option value="Film Buffs">Film Buffs</option>
                                <option value="Book Lovers">Book Lovers</option>
                                <option value="Sports Fans">Sports Fans</option>
                                <option value="DIY Enthusiasts">DIY Enthusiasts</option>
                                <option value="Anime Fans">Anime Fans</option>
                                <option value="Investors">Investors</option>
                                <option value="Psychology Enthusiasts">Psychology Enthusiasts</option>
                                <option value="Custom">Custom</option>
                            </select>
                        </div>
                        {audience === 'Custom' && (
                            <div>
                                <label>Custom Audience:</label>
                                <input type="text" value={customAudience} onChange={(e) => setCustomAudience(e.target.value)} />
                            </div>
                        )}
                        <div>
                            <label>Look and Feel:</label>
                            <select value={lookAndFeel} onChange={(e) => setLookAndFeel(e.target.value)}>
                                <option value="Inspirational">Inspirational</option>
                                <option value="Bright">Bright</option>
                                <option value="Clean">Clean</option>
                                <option value="Minimalist">Minimalist</option>
                                <option value="Professional">Professional</option>
                                <option value="Energetic">Energetic</option>
                                <option value="Elegant">Elegant</option>
                                <option value="Playful">Playful</option>
                                <option value="Bold">Bold</option>
                                <option value="Serene">Serene</option>
                            </select>
                        </div>
                        <div>
                            <label>Platform:</label>
                            <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                                <option value="YouTube">YouTube</option>
                                <option value="YouTube Shorts">YouTube Shorts</option>
                                <option value="Instagram Reels">Instagram Reels</option>
                                <option value="TikTok">TikTok</option>
                                <option value="LinkedIn">LinkedIn</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Twitter">Twitter</option>
                                <option value="Pinterest">Pinterest</option>
                                <option value="Snapchat">Snapchat</option>
                            </select>
                        </div>
                        <div>
                            <label>Workflow:</label>
                            <select value={workflow} onChange={(e) => setWorkflow(e.target.value)}>
                                <option value="YouTube Explainer">YouTube Explainer</option>
                                <option value="Script to Video">Script to Video</option>
                                <option value="YouTube Shorts">YouTube Shorts</option>
                                <option value="News Video">News Video</option>
                                <option value="TikTok Video">TikTok Video</option>
                                <option value="Instagram Reel">Instagram Reel</option>
                            </select>
                        </div>
                        <div>
                            <label>Plugins (može da se koristi samo u plaćenoj verziji):</label>
                            <select value={plugins} onChange={(e) => setPlugins(e.target.value)} multiple>
                                <option value="Clone your voice">Clone your voice (može da se koristi samo u plaćenoj verziji)</option>
                            </select>
                        </div>
                        <button type="submit">Create Video</button>
                    </form>
                    {videoUrl && (
                        <div>
                            <h3>Generated Video:</h3>
                            <a href={videoUrl} target="_blank" rel="noopener noreferrer">Watch Video</a>
                            <div>
                                <h3>Edit Video:</h3>
                                <div>
                                    <label>Add Background Music:</label>
                                    <input type="file" onChange={(e) => setBackgroundMusic(e.target.files[0])} />
                                </div>
                                <div>
                                    <label>Add Subtitles:</label>
                                    <input type="text" value={subtitleText} onChange={(e) => setSubtitleText(e.target.value)} />
                                </div>
                                <div>
                                    <label>Trim Video Start (seconds):</label>
                                    <input type="number" value={trimStart} onChange={(e) => setTrimStart(e.target.value)} />
                                </div>
                                <div>
                                    <label>Trim Video End (seconds):</label>
                                    <input type="number" value={trimEnd} onChange={(e) => setTrimEnd(e.target.value)} />
                                </div>
                                <div>
                                    <label>Change Video Speed:</label>
                                    <select value={videoSpeed} onChange={(e) => setVideoSpeed(e.target.value)}>
                                        <option value="0.5">0.5x</option>
                                        <option value="1">1x</option>
                                        <option value="1.5">1.5x</option>
                                        <option value="2">2x</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Add Filter:</label>
                                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                                        <option value="none">None</option>
                                        <option value="grayscale">Grayscale</option>
                                        <option value="sepia">Sepia</option>
                                        <option value="negative">Negative</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Add Animation:</label>
                                    <select value={animation} onChange={(e) => setAnimation(e.target.value)}>
                                        <option value="none">None</option>
                                        <option value="fade">Fade</option>
                                        <option value="slide">Slide</option>
                                        <option value="zoom">Zoom</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Background Color:</label>
                                    <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                                </div>
                                <div>
                                    <label>Remove Background:</label>
                                    <input type="checkbox" checked={removeBackground} onChange={(e) => setRemoveBackground(e.target.checked)} />
                                </div>
                                <div>
                                    <label>Add Logo:</label>
                                    <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
                                </div>
                                <div>
                                    <label>Adjust Volume:</label>
                                    <input type="range" min="0" max="2" step="0.1" value={volume} onChange={(e) => setVolume(e.target.value)} />
                                </div>
                                <div>
                                    <label>Transition Effect:</label>
                                    <select value={transitionEffect} onChange={(e) => setTransitionEffect(e.target.value)}>
                                        <option value="none">None</option>
                                        <option value="fade">Fade</option>
                                        <option value="wipe">Wipe</option>
                                        <option value="slide">Slide</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Rotate Video (degrees):</label>
                                    <input type="number" value={rotation} onChange={(e) => setRotation(e.target.value)} />
                                </div>
                                <div>
                                    <label>Adjust Contrast:</label>
                                    <input type="range" min="0" max="2" step="0.1" value={contrast} onChange={(e) => setContrast(e.target.value)} />
                                </div>
                                <div>
                                    <label>Adjust Brightness:</label>
                                    <input type="range" min="0" max="2" step="0.1" value={brightness} onChange={(e) => setBrightness(e.target.value)} />
                                </div>
                                <div>
                                    <label>Adjust Saturation:</label>
                                    <input type="range" min="0" max="2" step="0.1" value={saturation} onChange={(e) => setSaturation(e.target.value)} />
                                </div>
                                <div>
                                    <label>Select type of watermarks:</label>
                                    <select value={watermark} onChange={(e) => setWatermark(e.target.value)}>
                                        <option value="Stock Watermarks">Stock Watermarks</option>
                                        <option value="No Watermarks">No Watermarks (može da se koristi samo u plaćenoj verziji)</option>
                                    </select>
                                    {watermark === 'No Watermarks' && <p>Requires an upgrade to a paid plan</p>}
                                </div>
                                <div>
                                    <label>Select invideo AI branding:</label>
                                    <select value={branding} onChange={(e) => setBranding(e.target.value)}>
                                        <option value="Normal">Normal</option>
                                        <option value="Subtle">Subtle (može da se koristi samo u plaćenoj verziji)</option>
                                        <option value="None">None (može da se koristi samo u plaćenoj verziji)</option>
                                    </select>
                                    {branding !== 'Normal' && <p>Requires an upgrade to a paid plan</p>}
                                </div>
                                <div>
                                    <label>Select export resolution:</label>
                                    <select value={exportResolution} onChange={(e) => setExportResolution(e.target.value)}>
                                        <option value="480p">480p</option>
                                        <option value="720p">720p</option>
                                        <option value="1080p">1080p (može da se koristi samo u plaćenoj verziji)</option>
                                        <option value="4k">4k (može da se koristi samo u plaćenoj verziji)</option>
                                    </select>
                                    {(exportResolution === '1080p' || exportResolution === '4k') && <p>Requires an upgrade to a paid plan</p>}
                                </div>
                                <div>
                                    <label>Merge Videos:</label>
                                    <input type="file" multiple onChange={handleMergeVideoChange} />
                                </div>
                                <div>
                                    <label>Noise Reduction:</label>
                                    <input type="checkbox" checked={noiseReduction} onChange={(e) => setNoiseReduction(e.target.checked)} />
                                </div>
                                <div>
                                    <label>Sound Effect:</label>
                                    <select value={soundEffect} onChange={(e) => setSoundEffect(e.target.value)}>
                                        <option value="none">None</option>
                                        <option value="echo">Echo</option>
                                        <option value="reverb">Reverb</option>
                                        <option value="distortion">Distortion</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Resolution:</label>
                                    <select value={resolution} onChange={(e) => setResolution(e.target.value)}>
                                        <option value="720p">720p</option>
                                        <option value="1080p">1080p</option>
                                        <option value="1440p">1440p</option>
                                        <option value="2160p">2160p</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Vignette:</label>
                                    <input type="checkbox" checked={vignette} onChange={(e) => setVignette(e.target.checked)} />
                                </div>
                                <div>
                                    <label>Time Effect:</label>
                                    <select value={timeEffect} onChange={(e) => setTimeEffect(e.target.value)}>
                                        <option value="none">None</option>
                                        <option value="fast-forward">Fast Forward</option>
                                        <option value="slow-motion">Slow Motion</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Text Animation:</label>
                                    <select value={textAnimation} onChange={(e) => setTextAnimation(e.target.value)}>
                                        <option value="none">None</option>
                                        <option value="bounce">Bounce</option>
                                        <option value="fade">Fade</option>
                                        <option value="slide">Slide</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Remove Silence:</label>
                                    <input type="checkbox" checked={removeSilence} onChange={(e) => setRemoveSilence(e.target.checked)} />
                                </div>
                                <div>
                                    <label>Share on Social Media:</label>
                                    <select value={socialMedia} onChange={(e) => setSocialMedia(e.target.value)}>
                                        <option value="none">None</option>
                                        <option value="youtube">YouTube</option>
                                        <option value="facebook">Facebook</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="twitter">Twitter</option>
                                        <option value="linkedin">LinkedIn</option>
                                        <option value="tiktok">TikTok</option>
                                        <option value="snapchat">Snapchat</option>
                                        <option value="pinterest">Pinterest</option>
                                        <option value="whatsapp">WhatsApp</option>
                                        <option value="reddit">Reddit</option>
                                    </select>
                                </div>
                                <div>
                                    <label>GIF Duration (seconds):</label>
                                    <input type="number" value={gifDuration} onChange={(e) => setGifDuration(e.target.value)} />
                                </div>
                                <div>
                                    <label>Title Slide Text:</label>
                                    <input type="text" value={titleSlideText} onChange={(e) => setTitleSlideText(e.target.value)} />
                                </div>
                                <div>
                                    <label>End Slide Text:</label>
                                    <input type="text" value={endSlideText} onChange={(e) => setEndSlideText(e.target.value)} />
                                </div>
                                <div>
                                    <label>CTA Text:</label>
                                    <input type="text" value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
                                </div>
                                <button onClick={handleGenerate}>Generate Edited Video</button>
                                {editedVideoUrl && (
                                    <div>
                                        <h3>Edited Video:</h3>
                                        <a href={editedVideoUrl} target="_blank" rel="noopener noreferrer">Watch Edited Video</a>
                                        <div>
                                            <h3>Share Video:</h3>
                                            <button onClick={() => handleShare('YouTube')}>Share on YouTube</button>
                                            <button onClick={() => handleShare('Facebook')}>Share on Facebook</button>
                                            <button onClick={() => handleShare('Instagram')}>Share on Instagram</button>
                                            <button onClick={() => handleShare('Twitter')}>Share on Twitter</button>
                                            <button onClick={() => handleShare('LinkedIn')}>Share on LinkedIn</button>
                                            <button onClick={() => handleShare('TikTok')}>Share on TikTok</button>
                                            <button onClick={() => handleShare('Snapchat')}>Share on Snapchat</button>
                                            <button onClick={() => handleShare('Pinterest')}>Share on Pinterest</button>
                                            <button onClick={() => handleShare('WhatsApp')}>Share on WhatsApp</button>
                                            <button onClick={() => handleShare('Reddit')}>Share on Reddit</button>
                                        </div>
                                    </div>
                                )}
                                {transcript && (
                                    <div>
                                        <h3>Video Transcript:</h3>
                                        <textarea value={transcript} readOnly />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default InspiringQuotes;
