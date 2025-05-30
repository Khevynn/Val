package com.olimpo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.olimpo.DTO.ApiResponse;
import com.olimpo.DTO.LoginRequestDTO;
import com.olimpo.DTO.RegisterRequestDTO;
import com.olimpo.DTO.TournamentDTO;
import com.olimpo.Entity.TournamentEntity;
import com.olimpo.Entity.UserEntity;
import com.olimpo.Repository.TournamentRepository;
import com.olimpo.Repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController 
public class RestApiController {
    
    //Instatiating the class with the database manipulation methods
    @Autowired 
    private UserRepository userRepository;

    @Autowired
    private TournamentRepository tournamentRepository;

    //route to REGISTER an user into the database
    @CrossOrigin(origins = "*") //allow ever origin
    @PostMapping("/user/register")
    public ResponseEntity<ApiResponse> register(@RequestBody @Valid RegisterRequestDTO request) {
    
        //checking if email is duplicated
        if (userRepository.findByEmail(request.getEmail()).isPresent()) { 
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse("Email já cadastrado."));
        }

        //checking if user is duplicated
        if (userRepository.findByUser(request.getUser()).isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse("Nome de usuário já cadastrado."));
        }

        //Creating an UserEntity with a encoded password
        UserEntity user = new UserEntity();
        user.setUser(request.getUser());
        user.setEmail(request.getEmail());
        user.setEncodedPassword(request.getPassword());
        userRepository.save(user);
        
        //returning a good response
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new ApiResponse("Usuário registrado com sucesso."));
    }   

    //route to LOGIN an user into the database
    @CrossOrigin(origins = "*")
    @PostMapping("/user/login")
    public ResponseEntity<ApiResponse> login (@RequestBody @Valid LoginRequestDTO request){

        Optional<UserEntity> userSearched = userRepository.findByUser(request.getUser()); //finding a user by the username

        if (userSearched.isEmpty() || !new BCryptPasswordEncoder().matches(request.getPassword(), userSearched.get().getPassword() )) { //there is not a user
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse("Usuário ou senha incorretos."));
        }

        return ResponseEntity.ok(new ApiResponse("Login realizado com sucesso"));
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/tournaments/create")
    public Boolean createTournament(@RequestBody TournamentDTO request){
        try{
            TournamentEntity tournament = new TournamentEntity();
            tournament.setOwnerId(request.getOwnerId());
            tournament.setTournamentName(request.getTournamentName());
            tournament.setPrizePool(request.getPrizePool());

            tournamentRepository.save(tournament);
            return true;
        }catch(Exception exception){
            System.out.println(exception);
            return false;
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/tournaments/")
    public List getAllTournaments() {
        return tournamentRepository.findAll();
    }
}
