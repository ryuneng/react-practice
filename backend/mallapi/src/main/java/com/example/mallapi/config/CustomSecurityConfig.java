package com.example.mallapi.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.mallapi.security.filter.JWTCheckFilter;
import com.example.mallapi.security.handler.APILoginFailHandler;
import com.example.mallapi.security.handler.APILoginSuccessHandler;
import com.example.mallapi.security.handler.CustomAccessDeniedHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Configuration
@Log4j2
@RequiredArgsConstructor
@EnableMethodSecurity
public class CustomSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        log.info("------------------security config------------------");

        http.cors(httpSecurityCorsConfigurer -> {
            httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource());
        });

        // CSRF 설정은 GET 방식을 제외한 모든 요청에 CSRF 토큰을 사용하는 방식이지만,
        // API 서버를 작성할 때는 사용하지 않는 것이 일반적이므로 설정 추가
        // + API 서버는 무상태(Stateless)를 기본으로 사용하기 때문에 서버 내부에서 세션을 생성하지 않도록 추가
        http.sessionManagement(sessionConfig -> sessionConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.csrf(config -> config.disable());

        // formLogin 설정을 추가하면 스프링 시큐리티는 POST 방식으로 username과 password라는 파라미터를 통해 로그인 처리
        http.formLogin(config -> {
            config.loginPage("/api/member/login");
            config.successHandler(new APILoginSuccessHandler()); // 로그인 후 처리를 APILoginSuccessHandler로 설정
            config.failureHandler(new APILoginFailHandler()); // 로그인 실패 처리 시 설정
        });

        http.addFilterBefore(new JWTCheckFilter(), UsernamePasswordAuthenticationFilter.class); // JWT 체크

        // 유효시간이 지나지 않았지만 권한이 없는 사용자가 가진 Access Token을 사용하는 경우, ACCESSDENIED 에러메시지 전송
        http.exceptionHandling(config -> {
            config.accessDeniedHandler(new CustomAccessDeniedHandler());
        });

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
