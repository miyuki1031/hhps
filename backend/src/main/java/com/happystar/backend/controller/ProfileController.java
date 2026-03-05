package com.happystar.backend.controller;

import com.happystar.backend.entity.Profile;
import com.happystar.backend.repository.ProfileRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Profile")
@CrossOrigin(origins = "*") // Next.jsから繋ぐために必要！

public class ProfileController {

    private final ProfileRepository profileRepository;

    public ProfileController(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @GetMapping("/me")
    public Profile getProfile() {
        List<Profile> profiles = profileRepository.findAll();
        // System.out.println("DBの中身の数: " + profiles.size()); // 👈 これを足してにょ！

        Profile p = profiles.stream().findFirst().orElse(null);
        System.out.println("返却するデータ: " + p);
        return p;
        ////////////////////////////////////////////////////
        // findAll() ではなく、さっき作った findAllByNative() を使うにょ！
        // List<Profile> profiles = profileRepository.findAllByNative();
        // System.out.println("DBの中身の数: " + profiles.size());
        // return profiles.stream().findFirst().orElse(null);
    }

    @PostMapping // 「保存してにょ！」というリクエストを受け取る
    public Profile saveProfile(@RequestBody Profile profile) {
        // 届いたプロフィール情報をDBに保存するにょ
        return profileRepository.save(profile);
    }
}