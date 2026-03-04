package com.happystar.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "tech_stack")
public class TechStack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 自動採番を忘れずに！
    private Integer id;

    // @ManyToOne
    // @JoinColumn(name = "profile_id") // ここで繋がってるはずだにょ
    // private Profile profile;

    private String name;
    // @Column(name = "icon_path")
    // private String iconPath;
}
