package com.happystar.backend.repository;

import com.happystar.backend.entity.Profile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, String> {
    // これだけで保存や検索が全部できるようになります！

    // 以下はqueryを直接書く例
    // DBに先頭大文字で登録しているのに実行時小文字にされてしまうため試した。
    // @Query(value = "SELECT * FROM \"Profile\"", nativeQuery = true)
    // List<Profile> findAllByNative();
}