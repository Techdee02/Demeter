package org.app_backend.demeter.configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.annotations.servers.Servers;

@OpenAPIDefinition(
        info = @Info(
                title = "Demeter API",
                version = "1.0",
                description = "API documentation for the Demeter application",
                contact = @Contact(
                        name = "Demeter Support",
                        email = "fakorodehenry@gmail.com",
                        url = "henry-vercel.app"),
                license = @License(
                        name = "MIT License",
                        url = "https://opensource.org/licenses/MIT"),
                termsOfService = "https://example.com/terms"
        ),
        security = {@SecurityRequirement(name = "bearerAuth")},
        servers = {
                @Server(url = "http://localhost:8080", description = "Local development server"),
                @Server(url = "https://api.demeter.com", description = "Production server")
        }
)
@SecurityScheme(name = "bearerAuth", type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat="JWT", description = "JWT Bearer token authentication", in = SecuritySchemeIn.HEADER)
public class OpenApiConfiguration {


}
