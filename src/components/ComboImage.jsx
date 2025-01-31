import React, { useEffect, useRef, useState, useMemo } from 'react'

export default function CharacterImage(props) {

    const canvasRef = useRef(null)

    const { name, comboAliens } = props;
    console.log(comboAliens)
    // console.log(short)
    const [imageHeight, setImageHeight] = useState(1050)

    const [image, setImage] = useState(null)

    const image_width = 675;

    // console.log(aliens)

    const loadImage = async img => {
        await new Promise((resolve, reject) => {
            img.onload = async () => {
                console.log("Image Loaded");
                resolve(true);
            };
        });
    };

    const background = useMemo(() => new Image(), []);
    background.src = `${process.env.PUBLIC_URL}/Combo Base.jpg`

    const blackLamps =  useMemo(() => new Image(), []);
    blackLamps.src = `${process.env.PUBLIC_URL}/Combo Black Lamps.jpg`

    const yellowLamps =  useMemo(() => new Image(), []);
    yellowLamps.src = `${process.env.PUBLIC_URL}/Combo Yellow Lamps.jpg`

    const redLamps =  useMemo(() => new Image(), []);
    redLamps.src = `${process.env.PUBLIC_URL}/Combo Red Lamps.jpg`

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        context.clearRect(0, 0, canvas.width, canvas.height)

        // Pre-Determine wrapped text

        // context.font = "34px Palatino"
        // const ability_text_spacing = 35
        // const wild_text_wrapped = wrap_text(wildAbility, context)
        // const super_text_wrapped = wrap_text(superAbility, context)

        // Background
        // background.src = `${process.env.PUBLIC_URL}/Combo Base.jpg`
        console.log(background.complete)
        context.drawImage(background, 0, 0)

        // Title
        context.textAlign = "center"
        context.textBaseline = "alphabetic"
        context.fillStyle = '#000000'

        context.font = "41px BlairITCStd"
        context.letterSpacing = "-3px";

        let font_size = 41
        let letter_spacing = -3

        let title_width = context.measureText(name).width
        while (title_width > 575) {
            letter_spacing -= 1
            font_size -= 1
            context.letterSpacing = `-${letter_spacing}px`;
            context.font = `${font_size}px BlairITCStd`
            title_width = context.measureText(name).width
        }

        context.fillText(name, 337, Math.floor(110 + letter_spacing / 2))
        context.letterSpacing = "-3px";


        // console.log(comboAliens)
        for (let i = 0; i < 8; i++) {
            if (comboAliens[i] === "-1") {
                context.font = "34px BlairITCStd"
                context.letterSpacing = "-3px";
                context.fillText('None',
                    338, 174 + 109 * i)
                context.font = "33px AdobeGaramondPro"
                context.letterSpacing = "-1px";
                context.fillText(`Do not use this combo with ${i + 1} players`, 338, 221 + 109 * i)
                context.drawImage(blackLamps, 0, i * 104, 51, 104, 582, 158 + i * 104, 51, 104)
            } else if (comboAliens[i]) {
                // console.log(aliens[comboAliens[i]])
                context.font = "34px BlairITCStd"
                context.letterSpacing = "-3px";
                context.fillText(comboAliens[i].original.altTimeline ? `${comboAliens[i].original.name} (AT)` :
                    comboAliens[i].original.altTimelineID ? `${comboAliens[i].original.name} (Orig)` : comboAliens[i].original.name,
                    338, 174 + 109 * i)
                context.font = "33px AdobeGaramondPro"
                context.letterSpacing = "-1px";
                let short_width = context.measureText(comboAliens[i].original.short).width
                let letter_spacing = -1
                let font_size = 33
                while (short_width > 450) {
                    letter_spacing -= 1
                    font_size -= 1
                    context.letterSpacing = `-${letter_spacing}px`;
                    context.font = `${font_size}px AdobeGaramondPro`
                    short_width = context.measureText(comboAliens[i].original.short).width
                }
                context.fillText(comboAliens[i].original.short, 338, 221 + 109 * i)
                if (comboAliens[i].original.alert === "Yellow") {
                    context.drawImage(yellowLamps, 0, i * 104, 51, 104, 582, 158 + i * 104, 51, 104)
                } else if (comboAliens[i].original.alert === "Red") {
                    context.drawImage(redLamps, 0, i * 104, 51, 104, 582, 158 + i * 104, 51, 104)
                }
            }

        }


        setImageHeight(1050)

        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            setImage(url)
            // const newImg = new Image()

            // newImg.onload = () => {
            //     URL.revokeObjectURL(url)
            // }

            // newImg.src = url;
        })

    }, [name, comboAliens, background, blackLamps, redLamps, yellowLamps])

    // console.log(image)

    return <>
        {image ?
            <img alt=""
                className={`float-start bg-white ${props.className}`}
                src={image}
                style={props.style}
            // {...props} 
            /> : null}
        <canvas
            className='d-none'
            height={imageHeight}
            ref={canvasRef}
            width={imageHeight * 9 / 14}
        />
    </>
}