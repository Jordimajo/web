import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import EuroIcon from '@mui/icons-material/Euro';

const Input = styled(MuiInput)`
  width: 90px;

  @media (min-width: 600px) {
    width: 70px;
  }
`;

function determinarRango(precio) {
    if (precio < 80) return { min: 0, max: 100, step: 0.01 };
    if (precio < 160) return { min: 0, max: 250, step: 0.01 };
    if (precio < 400) return { min: 0, max: 500, step: 0.01 };
    if (precio < 800) return { min: 0, max: 1000, step: 0.01 };
    return { min: 0, max: 2000, step: 0.01 };
}

export default function InputSlider(props) {
    const { precioReal = 0, setPrecioEstimado, precioCorrecto } = props;
    const { min, max, step } = determinarRango(precioReal);
    const [value, setValue] = React.useState((min + max) / 2);
    const [inputValue, setInputValue] = React.useState(value.toFixed(2));
    const marks = precioCorrecto
        ? [{ value: precioCorrecto, label: `${precioCorrecto.toFixed(2)}€`, style: { color: 'red', height: '20px', width: '20px' } }]
        : [];


    React.useEffect(() => {
        setPrecioEstimado(value);
    }, [setPrecioEstimado, value]);

    React.useEffect(() => {
        const nuevoValorCentrado = (min + max) / 2;
        setValue(nuevoValorCentrado);
        setInputValue(nuevoValorCentrado.toFixed(2));
    }, [precioReal, min, max]);


    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        setInputValue(newValue.toFixed(2));
        setPrecioEstimado(newValue);
    };

    const handleInputChange = (event) => {
        const val = event.target.value;

        if (val === "") {
            setInputValue(val);
            return;
        }

        const isValidFormat = /^(\d+\.?\d{0,2}|\.\d{0,2})$/.test(val);

        if (isValidFormat) {
            setInputValue(val);

            const parsedValue = parseFloat(val);

            if (!isNaN(parsedValue)) {
                const clampedValue = Math.min(Math.max(parsedValue, min), max);
                setValue(clampedValue);
                setPrecioEstimado(clampedValue);
            }
        }
    };

    return (
        <Box sx={{ width: { xs: '100%', md: 500 }, margin: '0 auto', textAlign: 'center', marginBottom: '2rem' }}>
            <Typography id="input-slider" gutterBottom>
                ¿Cuál es su precio?
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <EuroIcon />
                </Grid>
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        min={min}
                        max={max}
                        step={step}
                        aria-labelledby="input-slider"
                        valueLabelDisplay="auto"
                        sx={{
                            "& .MuiSlider-track": {
                                opacity: 1
                            },
                            "& .MuiSlider-mark": {
                                backgroundColor: '#cccccc',
                                "&[data-index='0']": {
                                    backgroundColor: 'rgba(255, 0, 0, 1)',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    marginTop: '0px',
                                    marginLeft: '-9px',
                                    zIndex: 2,
                                }
                            },
                            "& .MuiSlider-thumb": {
                                zIndex: 1
                            },
                            "& .MuiSlider-markLabel": {
                                fontSize: "1.5rem",
                                "&[data-index='0']": {
                                }
                            }
                        }}
                        marks={marks}
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={inputValue}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={() => setInputValue(value.toFixed(2))}
                        inputProps={{
                            step: step,
                            min: min,
                            max: max,
                            type: 'text',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

