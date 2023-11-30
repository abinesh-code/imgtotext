package com.example.imgtotext;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import net.sourceforge.tess4j.util.LoadLibs;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

@RestController
public class ConvertController {

    @PostMapping("/extractText")
    public String extractTextFromImage(@RequestParam("file") MultipartFile file, HttpServletResponse response) {
        
        String extractedText = "";
        ITesseract tesseract = new Tesseract();
        try {

            File path = LoadLibs.extractTessResources("tessdata");

            tesseract.setDatapath(path.getAbsolutePath());

            BufferedImage image = ImageIO.read(file.getInputStream());

            // Perform OCR on the uploaded image file
            extractedText = tesseract.doOCR(image);
        
        } catch (IOException | TesseractException e) {
            // Handle exceptions here
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
        return extractedText;
    }
}



