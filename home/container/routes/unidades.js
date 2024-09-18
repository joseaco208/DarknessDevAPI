const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const message = `Asegúrate de escribir las unidades correctamente, incluyendo acentos y tildes. Por ejemplo, se debe escribir 'kilómetros' con tilde, no 'kilometro'.<br><br>Unidades disponibles:<br>
    • metros<br>
    • pies<br>
    • kilómetros<br>
    • millas<br>
    • centímetros<br>
    • pulgadas<br>
    • yardas<br>
    • milímetros<br>
    • milímetros cuadrados<br>
    • centímetros cuadrados<br>
    • metros cuadrados<br>
    • hectáreas<br>
    • kilómetros cuadrados<br>
    • pulgadas cuadradas<br>
    • yardas cuadradas<br>
    • pies cuadrados<br>
    • acres<br>
    • millas cuadradas<br>
    • microgramos<br>
    • miligramos<br>
    • gramos<br>
    • kilogramos<br>
    • toneladas<br>
    • milímetros cúbicos<br>
    • centímetros cúbicos<br>
    • mililitros<br>
    • centilitros<br>
    • decilitros<br>
    • litros<br>
    • kilolitros<br>
    • metros cúbicos<br>
    • kilómetros cúbicos<br>
    • cucharaditas<br>
    • cucharadas<br>
    • vasos<br>
    • tazas<br>
    • onzas fluidas<br>
    • pintas<br>
    • cuartos<br>
    • galones<br>
    • unidades<br>
    • docenas<br>
    • grados Celsius<br>
    • kelvin<br>
    • grados Fahrenheit<br>
    • grados Rankine<br>
    • nanosegundos<br>
    • micrómetros<br>
    • milisegundos<br>
    • segundos<br>
    • minutos<br>
    • horas<br>
    • días<br>
    • semanas<br>
    • meses<br>
    • años<br>
    • bits<br>
    • kilobits<br>
    • megabits<br>
    • gigabits<br>
    • terabits<br>
    • bytes<br>
    • kilobytes<br>
    • megabytes<br>
    • gigabytes<br>
    • terabytes<br>
    • partes por millón<br>
    • partes por mil millones<br>
    • partes por billón<br>
    • partes por cuatrillón<br>
    • metros por segundo<br>
    • kilómetros por hora<br>
    • nudos<br>
    • pies por segundo<br>
    • minutos por kilómetro<br>
    • segundos por metro<br>
    • minutos por milla<br>
    • segundos por pie<br>
    • pascales<br>
    • kilopascales<br>
    • megapascales<br>
    • hectopascales<br>
    • bares<br>
    • torr<br>
    • libras por pulgada cuadrada<br>
    • mil libras por pulgada cuadrada<br>
    • amperios<br>
    • miliamperios<br>
    • kiloamperios<br>
    • voltios<br>
    • milivoltios<br>
    • kilovoltios<br>
    • vatios<br>
    • milivatios<br>
    • kilovatios<br>
    • megavatios<br>
    • gigavatios<br>
    • varios<br>
    • milivarios<br>
    • kilovarios<br>
    • megavarios<br>
    • gigavarios<br>
    • voltios-amperios<br>
    • milivoltios-amperios<br>
    • kilovoltios-amperios<br>
    • megavoltios-amperios<br>
    • gigavoltios-amperios<br>
    • vatios-hora<br>
    • milivatios-hora<br>
    • kilovatios-hora<br>
    • megavatios-hora<br>
    • gigavatios-hora`;

    res.send(message);
});

module.exports = router;